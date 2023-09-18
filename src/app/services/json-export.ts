import {CanvasField} from '@/app/models/canvas-field';
import {APP_NAME, APP_SRC, APP_URL, APP_VERSION} from '@/app/models/app-constants';

type BorderColor = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface ExportJson {
    application: string,
    version: string,
    src: string,
    url: string,
    border: BorderColor,
    fields: CanvasField[]
}

export const jsonExporter = new class JsonExporter {
    public getJsonFromData(fields: CanvasField[], border: BorderColor): ExportJson {
        return {
            application: APP_NAME,
            version: APP_VERSION,
            src: APP_SRC,
            url: APP_URL,
            border,
            fields,
        };
    }

    public getDataFromJson(jsonString: string): ExportJson {
        return JSON.parse(jsonString);
    }
};
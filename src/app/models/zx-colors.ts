import {ZxColorNames} from '@/app/models/zx-color-names';
import {Color} from '@/app/models/color';

export type ZxColors = {
    [key in ZxColorNames]: Color;
}
import {ZxColorTypes} from '@/app/models/zx-color-types';
import {ZxColors} from '@/app/models/zx-colors';

export type ZxPalette = {
    [key in ZxColorTypes]: ZxColors
}
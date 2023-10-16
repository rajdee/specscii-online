import {Metadata} from 'next';
import Editor from '@/app/editor';

export default function Home() {
    return (
        <Editor />
    );
}
export const metadata: Metadata = {
    title: 'SpecSCII editor',
    description: 'SpecSCII editor',
};

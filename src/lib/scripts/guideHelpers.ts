import path from 'path';

export function parseGuideId(file: string): string {
    const name = path.parse(file).name.split('.');
    return (isNaN(parseInt(name[0])) ? name : name.splice(1)).join('.');
}
import path from 'path';

export function parseGuideId(file: string, removeInt: boolean = true): string {
    const parsed = path.parse(file);
    if (!removeInt) return parsed.name;

    const name = parsed.name.split('.');
    return (isNaN(parseInt(name[0])) ? name : name.splice(1)).join('.');
}
export const load = (data: any) => {
    return {
        package: data.params.package,
        tag: data.params.tag,
        class: data.params.class
    };
};
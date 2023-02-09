export const load = (data: any) => {
    return {
        package: data.params.package,
        tag: data.params.tag,
        function: data.params.function
    };
};
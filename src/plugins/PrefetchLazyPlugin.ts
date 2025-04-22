export const prefetchLazyPlugin = (paths: string[] = [], prefix: string) => {
    const scriptArrs: string[] = [];
    return {
        name: 'vite-plugin-prefetch-lazy',
        generateBundle(_options, bundle) {
            // console.log('options', options);

            const values = Object.values(bundle);
            // console.log('values', values);
            values.forEach((item) => {
                if (paths.includes(item.name)) {
                    // console.log('item', item.fileName);
                    scriptArrs.push(prefix + item.fileName);
                }
            });
            // console.log('isWrite', isWrite);
        },

        transformIndexHtml() {
            return scriptArrs.map((href) => {
                return {
                    tag: 'link',
                    attrs: {
                        rel: 'prefetch',
                        href: href,
                        as: 'script'
                    },
                    injectTo: 'head'
                };
            });
        }
    };
};

import Container from "typedi";

export const Module = (Module: Zink.IModule) => {
    return (target) => {
        if(Module.providers)
            Module.providers.forEach((p) =>
                Reflect.defineMetadata("imports", Module.imports||[], p),
            );
        if(Module.gateways)
            Module.gateways.forEach((p) =>
                Reflect.defineMetadata("providers", Module.providers||[], p),
            );
        Reflect.defineMetadata("imports", Module.imports || [], target);
        Reflect.defineMetadata("gateways", Module.gateways || [], target);
        Reflect.defineMetadata("providers", Module.providers || [], target);
    };
};

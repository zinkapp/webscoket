export const Event = (eventName: string) => {
  return (target, propertyKey: string) => {
    if (!Reflect.hasMetadata("events", target.constructor))
      Reflect.defineMetadata("events", [], target.constructor);

    const events = Reflect.getMetadata("events", target.constructor);
    events.push({
      key: propertyKey,
      eventName,
    });
    Reflect.defineMetadata("events", events, target.constructor);
  };
};

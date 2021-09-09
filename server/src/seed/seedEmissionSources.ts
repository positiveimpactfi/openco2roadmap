import { Connection } from "typeorm";
import { Component } from "../entity/Component";
import { EmissionSource } from "../entity/EmissionSource";
import { emissionSources } from "./data/emissionSources";

export const seedEmissionSources = async (conn: Connection) => {
  for (let es of emissionSources) {
    const components = await conn.manager.findByIds(Component, es.componentIDs);
    console.log("FOUND COMPONENTS", components);
    const newEmissionSource = await conn.manager
      .create(EmissionSource, {
        id: es.id,
        name: es.name,
        scope: es.scope,
        components: Promise.resolve(components),
      })
      .save();
    for (let component of components) {
      component.emissionSources = [
        ...component.emissionSources,
        newEmissionSource,
      ];
      const res = await conn.manager.save(Component, component);
      console.log("new component", res);
    }
    console.log("saved new emission source", newEmissionSource);
  }
  console.log("done saving emission sources");
};

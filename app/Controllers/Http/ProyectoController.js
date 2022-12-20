"use strict";

const Proyecto = use("App/Models/Proyecto");
const AutorizacionService = use("App/Services/AutorizacionService");

class ProyectoController {
  
  async index({ auth }) {
    const user = await auth.getUser();
    return await user.proyectos().fetch();
  }


  async store({ auth, request }) {
    const user = await auth.getUser();
    const { nombre } = request.all();
    const newProject = new Proyecto();
    newProject.fill({ nombre });
    await user.proyectos().save(newProject);
    return newProject;
  }


  async update({ auth, params, request }) {
    const user = await auth.getUser();
    const { id } = params;
    const proyectoId = await Proyecto.find(id);
    AutorizacionService.verificarPermiso(proyectoId, user);
    proyectoId.merge(request.only("nombre"));
    await proyectoId.save();
    return proyectoId;
  }


  async destroy({ auth, response, params }) {
    const user = await auth.getUser();
    const { id } = params;
    const proyectoId = await Proyecto.find(id);
    AutorizacionService.verificarPermiso(proyectoId, user);
    await proyectoId.delete();
    return response.status(200).json({ mensaje: "Proyecto eliminado." });
  }
}// .class

module.exports = ProyectoController;

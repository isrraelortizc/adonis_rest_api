'use strict'

const Route = use('Route')

Route.group(() => {
  Route.post("usuarios/login", "UserController.login");
  Route.post("usuarios/registro", "UserController.store").middleware("auth");
}).prefix("api/v1");

// Proyectos
Route.group(() => {
  Route.get("proyectos", "ProyectoController.index");
  Route.post("proyectos", "ProyectoController.store");
  Route.patch("proyectos/:id", "ProyectoController.update");
  Route.delete("proyectos/:id", "ProyectoController.destroy");
}).prefix("api/v1").middleware("auth");

// Tareas
Route.group(() => {
  Route.get("proyecto/:id/tareas", "TareaController.index");
  Route.post("proyecto/:id/tareas", "TareaController.store");
  Route.patch("tareas/:id", "TareaController.update");
  Route.delete("tareas/:id", "TareaController.destroy");
}).prefix("api/v1").middleware("auth");

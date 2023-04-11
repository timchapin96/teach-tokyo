// This file is auto-generated by ./bin/rails stimulus:manifest:update
// Run that command whenever you add a new controller or create them with
// ./bin/rails generate stimulus controllerName

import { application } from "./application"

import StudentListController from "./new_student_controller"
application.register("studentlist", StudentListController)

import Map from "./map_controller"
application.register("map", Map)

import Load from "./load_controller"
application.register("load", Load)

import NewGame from "./new_game_controller"
application.register("new_game", NewGame);

import TeamSelect from "./teams_controller"
application.register("team_select", TeamSelect)

import Menu from "./menu_controller"
application.register("menu", Menu)

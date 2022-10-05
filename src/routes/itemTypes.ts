import Router from "koa-router"
import {
  create,
  update,
  remove
} from "../controllers/itemTypes"

export default function itemTypesRoutes(router: Router) {
    router.post(
        "/types",
      create
    )
    .put(
        "/types/:id",
      update
    )
    .delete(
      "/types/:id",
      remove
    )
    return router
}

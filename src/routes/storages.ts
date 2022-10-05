import Router from "koa-router"
import {
  create,
  update
} from "../controllers/storages"
import {update} from "../controllers/itemTypes";

export default function storageRoutes(router: Router) {
    router.post(
        "/storages",
      create
    )
    .put(
      "/storages/:id",
      update
    )
    return router
}

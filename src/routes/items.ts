import Router from "koa-router"
import {
  create
} from "../controllers/items"

export default function itemsRoutes(router: Router) {
    router.post(
        "/items",
      create
    )
    return router
}

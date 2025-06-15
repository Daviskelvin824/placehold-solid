import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./routes/_layout.tsx", [
    // course list
    index("routes/landing/index.tsx"),
    route("/kedua", "routes/landing/kedua.tsx"),
    // course detail
    route("/:id", "routes/course/course-details.tsx"),
    // add course
    route("add", "routes/course/add.tsx"),

    ...prefix("/users", [
      //
      route("/:id", "routes/profile/profile-public.tsx"),
    ]),
  ]),
  route("/404", "routes/404/index.tsx"),
  //
] satisfies RouteConfig;

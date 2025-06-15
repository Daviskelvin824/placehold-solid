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
    // course detail
    route("/:id", "routes/course-details.tsx"),
    // add course
    route("add", "routes/course/add.tsx"),

    ...prefix("/users", [
      //
      route("/:id", "routes/profile-public.tsx"),
    ]),
  ]),
  //
] satisfies RouteConfig;

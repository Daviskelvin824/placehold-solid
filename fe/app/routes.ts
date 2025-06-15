import { type RouteConfig, index, layout } from "@react-router/dev/routes";

export default [
  layout("./routes/_layout.tsx", [
    //
    index("routes/landing/index.tsx"),
  ]),
  //
] satisfies RouteConfig;

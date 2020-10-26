import { Action, createStore } from "vuex";
import pathify from "vuex-pathify";
import global from "@/store/global-store";

pathify.options.mapping = "simple";
pathify.options.deep = 2;

export default createStore({
  ...global,
  modules: {},
  plugins: [pathify.plugin],
});


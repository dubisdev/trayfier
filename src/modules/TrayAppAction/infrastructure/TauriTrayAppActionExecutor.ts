import { TrayAppAction, TrayAppActions } from "../TrayAppAction";
import { open } from "@tauri-apps/plugin-shell";

export const TauriTrayAppActionExecutor = {
    execute(action: TrayAppAction) {
        switch (action.type) {
            case TrayAppActions.OPEN_PATH:
                this.openPath(action.configuration.path);
                break;
            case TrayAppActions.CODE:
                eval(action.configuration.code);
                break;
        }
    },

    openPath: (path: string) => {
        open(path);
    }
}

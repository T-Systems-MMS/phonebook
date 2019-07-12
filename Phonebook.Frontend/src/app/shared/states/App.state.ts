import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ThemeService } from 'src/app/services/theme.service';
import { Theme } from 'src/app/shared/models/enumerables/Theme';

export class ServiceWorkerNotificationDisplayed {
  public static readonly type: string = '[App State] Service Worker Notification displayed';
}

export class SetVersion {
  public static readonly type: string = '[App State] Set Version';
  constructor(public version: string) {}
}
export class SetDisplayedNotificationVersion {
  public static readonly type: string = '[App State] Set Displayed Notification Version';
  constructor(public version: number) {}
}

export class SetSendFeedback {
  public static readonly type: string = '[App State] Set Send Feedback';
  constructor(public sendFeedback: boolean) {}
}

export class SetTheme {
  public static readonly type: string = '[App State] Set activeTheme';
  constructor(public activeTheme: Theme) {}
}

export class InitTheme {
  public static readonly type: string = '[App State] Init activeTheme';
}

export interface AppStateModel {
  serviceWorkerNotificationDisplayed: boolean;
  version: string;
  displayedNotificationVersion: number;
  /**
   * Please note that this string is also used by Sentry (Raven-js) in order to determine if it is allowed to send BugReports
   * If you want to edit this Property please also change it in app.modules.ts
   */
  sendFeedback: boolean | null;
  activeTheme: Theme;
}

@State<AppStateModel>({
  name: 'appstate',
  defaults: {
    serviceWorkerNotificationDisplayed: false,
    version: '0.0.0',
    displayedNotificationVersion: 0,
    sendFeedback: null,
    activeTheme: Theme.magenta_light_theme
  }
})
export class AppState {
  constructor(private themeService: ThemeService) {}
  @Selector()
  public static serviceWorkerNotificationDisplayed(state: AppStateModel): boolean {
    return state.serviceWorkerNotificationDisplayed;
  }

  @Selector()
  public static version(state: AppStateModel): string {
    return state.version;
  }
  @Selector()
  public static activeTheme(state: AppStateModel): Theme {
    return state.activeTheme;
  }

  @Selector()
  public static displayedNotificationVersion(state: AppStateModel): number {
    return state.displayedNotificationVersion;
  }
  @Selector()
  public static sendFeedback(state: AppStateModel): boolean | null {
    return state.sendFeedback;
  }

  @Action(ServiceWorkerNotificationDisplayed)
  public serviceWorkerNotificationDisplayed(ctx: StateContext<AppStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      serviceWorkerNotificationDisplayed: true
    });
  }

  @Action(SetVersion)
  public setVersion(ctx: StateContext<AppStateModel>, action: SetVersion) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      version: action.version
    });
  }

  @Action(SetDisplayedNotificationVersion)
  public setDisplayedNotificationVersion(ctx: StateContext<AppStateModel>, action: SetDisplayedNotificationVersion) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      displayedNotificationVersion: action.version
    });
  }
  @Action(SetSendFeedback)
  public setSendFeedback(ctx: StateContext<AppStateModel>, action: SetSendFeedback) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      sendFeedback: action.sendFeedback
    });
  }

  @Action(SetTheme)
  public setTheme(ctx: StateContext<AppStateModel>, action: SetTheme) {
    const state = ctx.getState();
    this.themeService.setTheme(action.activeTheme);
    ctx.setState({
      ...state,
      activeTheme: action.activeTheme
    });
  }

  @Action(InitTheme)
  public initTheme(ctx: StateContext<AppStateModel>) {
    const state = ctx.getState();
    this.themeService.setTheme(state.activeTheme);
  }
}

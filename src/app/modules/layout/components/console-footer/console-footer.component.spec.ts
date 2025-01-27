import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { ConsolePanelDialogComponent } from 'app/modules/common/dialog/console-panel/console-panel-dialog.component';
import { ConsoleFooterComponent } from 'app/modules/layout/components/console-footer/console-footer.component';
import { ConsoleMessagesStore } from 'app/modules/layout/components/console-footer/console-messages.store';

describe('ConsoleFooterComponent', () => {
  let spectator: Spectator<ConsoleFooterComponent>;
  const createComponent = createComponentFactory({
    component: ConsoleFooterComponent,
    providers: [
      mockProvider(ConsoleMessagesStore, {
        lastThreeLogLines$: of("[12:35] I'm afraid I can't do that."),
      }),
      mockProvider(MatDialog),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('starts listening for console message updates when component is initiated', () => {
    expect(spectator.inject(ConsoleMessagesStore).subscribeToMessageUpdates).toHaveBeenCalled();
  });

  it('shows last 3 lines of console messages', () => {
    expect(spectator.query('.messages')).toHaveText("[12:35] I'm afraid I can't do that.");
  });

  it('opens ConsolePanelDialogComponent when footer is clicked', () => {
    spectator.click('.messages');

    expect(spectator.inject(MatDialog).open).toHaveBeenCalledWith(ConsolePanelDialogComponent);
  });
});

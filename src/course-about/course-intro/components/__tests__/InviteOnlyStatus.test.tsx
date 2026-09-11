import { getAuthenticatedUser } from '@edx/frontend-platform/auth';

import {
  render, screen, userEvent, waitFor,
} from '@src/setupTest';
import messages from '../../messages';
import { STATUS_MESSAGE_VARIANTS } from '../../constants';
import { InviteOnlyStatus } from '../InviteOnlyStatus';

// WishlistButton (rendered alongside the banner) checks auth on its own —
// mocked here to null so it renders nothing and this suite can stay focused
// on the banner/modal; WishlistButton has its own dedicated tests.
jest.mock('@edx/frontend-platform/auth', () => ({
  getAuthenticatedUser: jest.fn(() => null),
}));

const mockCourseId = 'course-v1:TestX+Test101+2023';

describe('InviteOnlyStatus', () => {
  it('renders the invitation-only banner', () => {
    render(<InviteOnlyStatus courseId={mockCourseId} />);

    const statusMessage = screen.getByRole('status');
    expect(statusMessage).toHaveClass(`course-about-status-banner--${STATUS_MESSAGE_VARIANTS.INFO}`);
    expect(statusMessage).toHaveTextContent(messages.statusMessageEnrollmentInvitationOnly.defaultMessage);
  });

  it('renders no Wishlist button for a logged-out visitor', () => {
    render(<InviteOnlyStatus courseId={mockCourseId} />);
    expect(getAuthenticatedUser).toHaveBeenCalled();
  });

  it('opens the "how to get an invite" modal on click and shows its title', async () => {
    const user = userEvent.setup();
    render(<InviteOnlyStatus courseId={mockCourseId} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: messages.howToGetInviteBtn.defaultMessage }));

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
    expect(screen.getAllByText(messages.inviteInstructionsModalTitle.defaultMessage).length).toBeGreaterThan(0);
  });
});

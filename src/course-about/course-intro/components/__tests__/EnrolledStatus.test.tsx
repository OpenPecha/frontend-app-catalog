import { render, screen } from '@src/setupTest';
import messages from '../../messages';
import { STATUS_MESSAGE_VARIANTS } from '../../constants';
import { EnrolledStatus } from '../EnrolledStatus';

describe('EnrolledStatus', () => {
  const defaultProps = {
    showCoursewareLink: false,
    courseId: 'test-course-123',
  };

  it('renders enrollment success status message', () => {
    render(<EnrolledStatus {...defaultProps} />);
    expect(screen.getByText(messages.statusMessageEnrolled.defaultMessage)).toBeInTheDocument();
  });

  it('always renders view course link regardless of showCoursewareLink', () => {
    render(<EnrolledStatus {...defaultProps} />);

    const viewCourseBtnLink = screen.getByRole('link', {
      name: messages.viewCourseBtn.defaultMessage,
    });
    expect(viewCourseBtnLink).toHaveAttribute('href', expect.stringContaining(defaultProps.courseId));
  });

  it('renders view course link when showCoursewareLink is true', () => {
    render(<EnrolledStatus {...defaultProps} showCoursewareLink />);

    const viewCourseBtnLink = screen.getByRole('link', {
      name: messages.viewCourseBtn.defaultMessage,
    });
    expect(viewCourseBtnLink).toHaveAttribute('href', expect.stringContaining(defaultProps.courseId));
  });

  it('renders status message with success variant', () => {
    render(<EnrolledStatus {...defaultProps} />);

    const statusMessage = screen.getByRole('status');
    expect(statusMessage).toHaveClass(`text-${STATUS_MESSAGE_VARIANTS.SUCCESS}-500`);
  });

  it('renders both status message and view course button', () => {
    render(<EnrolledStatus {...defaultProps} />);

    expect(screen.getByText(messages.statusMessageEnrolled.defaultMessage)).toBeInTheDocument();

    const viewCourseBtnLink = screen.getByRole('link', {
      name: messages.viewCourseBtn.defaultMessage,
    });
    expect(viewCourseBtnLink).toHaveAttribute('href', expect.stringContaining(defaultProps.courseId));
  });
});

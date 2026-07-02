import { render, screen } from '@src/setupTest';
import { AdditionalResources } from '.';

describe('AdditionalResources', () => {
  it('renders the OCW links content and MITOpenCourseware heading when provided', () => {
    render(<AdditionalResources ocwLinks='<a href="https://ocw.mit.edu/x">OCW materials</a>' />);
    expect(screen.getByText('MITOpenCourseware')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'OCW materials' })).toHaveAttribute(
      'href',
      'https://ocw.mit.edu/x',
    );
  });

  it('renders nothing when ocwLinks is empty', () => {
    const { container } = render(<AdditionalResources ocwLinks="  " />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when ocwLinks is null', () => {
    const { container } = render(<AdditionalResources ocwLinks={null} />);
    expect(container.firstChild).toBeNull();
  });
});

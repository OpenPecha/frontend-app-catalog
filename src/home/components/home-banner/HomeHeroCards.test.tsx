import { AppContext } from '@edx/frontend-platform/react';
import { getConfig } from '@edx/frontend-platform';

import { render, screen, cleanup } from '@src/setupTest';
import { useHeroCourses } from '@src/data/hero-courses/hooks';
import HomeHeroCards from './HomeHeroCards';

jest.mock('@src/data/hero-courses/hooks', () => ({
  useHeroCourses: jest.fn(),
}));

const mockUseHeroCourses = useHeroCourses as jest.Mock;

const courseA = {
  courseId: 'course-v1:Org+A+2026',
  title: 'Buddhist Logic and Epistemology',
  imageUrl: 'https://lms.example.com/asset/a.jpg',
  providerName: 'Khyentse Foundation',
  providerLogo: 'https://lms.example.com/logo/kf.png',
};

const courseB = {
  courseId: 'course-v1:Org+B+2026',
  title: 'Discovering the Buddha Within',
  imageUrl: null,
  providerName: 'Kagyu Yeshe',
  providerLogo: null,
};

const renderSignedIn = () => render(
  <AppContext.Provider value={{ authenticatedUser: { username: 'tenzin' }, config: {} } as any}>
    <HomeHeroCards />
  </AppContext.Provider>,
);

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

describe('<HomeHeroCards />', () => {
  it('renders both cards when two courses come back', () => {
    mockUseHeroCourses.mockReturnValue({ data: [courseA, courseB], isLoading: false, isError: false });

    render(<HomeHeroCards />);

    expect(screen.getByTestId('home-hero-cards')).toBeInTheDocument();
    expect(screen.getByText(courseA.title)).toBeInTheDocument();
    expect(screen.getByText(courseB.title)).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it('renders a single card without crashing', () => {
    mockUseHeroCourses.mockReturnValue({ data: [courseA], isLoading: false, isError: false });

    render(<HomeHeroCards />);

    expect(screen.getAllByRole('link')).toHaveLength(1);
    // With nothing to sit behind, the only card is the front one.
    expect(screen.getByRole('link')).toHaveClass('home-hero__card--front');
  });

  it('renders nothing when no courses come back', () => {
    mockUseHeroCourses.mockReturnValue({ data: [], isLoading: false, isError: false });

    render(<HomeHeroCards />);

    expect(screen.queryByTestId('home-hero-cards')).not.toBeInTheDocument();
  });

  it('renders nothing while loading, so the hero does not flash a skeleton', () => {
    mockUseHeroCourses.mockReturnValue({ data: undefined, isLoading: true, isError: false });

    render(<HomeHeroCards />);

    expect(screen.queryByTestId('home-hero-cards')).not.toBeInTheDocument();
  });

  it('stays silent on error rather than showing an error state', () => {
    mockUseHeroCourses.mockReturnValue({ data: undefined, isLoading: false, isError: true });

    render(<HomeHeroCards />);

    expect(screen.queryByTestId('home-hero-cards')).not.toBeInTheDocument();
  });

  it('never shows more than two cards', () => {
    mockUseHeroCourses.mockReturnValue({
      data: [courseA, courseB, { ...courseA, courseId: 'course-v1:Org+C+2026' }],
      isLoading: false,
      isError: false,
    });

    render(<HomeHeroCards />);

    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it('shows the provider logo when there is one', () => {
    mockUseHeroCourses.mockReturnValue({ data: [courseA], isLoading: false, isError: false });

    render(<HomeHeroCards />);

    expect(screen.getByAltText(`${courseA.providerName} logo`)).toHaveAttribute('src', courseA.providerLogo);
  });

  it('falls back to provider initials when there is no logo', () => {
    mockUseHeroCourses.mockReturnValue({ data: [courseB], isLoading: false, isError: false });

    render(<HomeHeroCards />);

    // "Kagyu Yeshe" -> "KY"
    expect(screen.getByText('KY')).toBeInTheDocument();
    expect(screen.queryByAltText(`${courseB.providerName} logo`)).not.toBeInTheDocument();
  });

  it('links a signed-out visitor to the in-app about page', () => {
    mockUseHeroCourses.mockReturnValue({ data: [courseA], isLoading: false, isError: false });

    render(<HomeHeroCards />);

    expect(screen.getByRole('link')).toHaveAttribute('href', `/courses/${courseA.courseId}/about`);
  });

  it('links a signed-in learner into the courseware on the LMS', () => {
    mockUseHeroCourses.mockReturnValue({ data: [courseA], isLoading: false, isError: false });

    renderSignedIn();

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      `${getConfig().LMS_BASE_URL}/courses/${courseA.courseId}/course/`,
    );
  });
});

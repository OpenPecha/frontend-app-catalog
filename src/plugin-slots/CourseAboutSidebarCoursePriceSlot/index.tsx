import { PluginSlot } from '@openedx/frontend-plugin-framework';
import { Sell as SellIcon } from '@openedx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import type { CourseAboutData } from '@src/course-about/types';
import SidebarDetailsItem from '@src/course-about/course-sidebar/sidebar-details/SidebarDetailsItem';
import messages from '@src/course-about/course-sidebar/sidebar-details/messages';

const CourseAboutSidebarCoursePriceSlot = ({ coursePrice }: { coursePrice: CourseAboutData['coursePrice'] }) => {
  const intl = useIntl();

  return (
    <PluginSlot
      id="org.openedx.frontend.catalog.course_about_page.sidebar.details.course_price"
      slotOptions={{
        mergeProps: true,
      }}
      pluginProps={{ coursePrice }}
    >
      <SidebarDetailsItem
        key="price"
        icon={SellIcon}
        label={intl.formatMessage(messages.price)}
        value={coursePrice}
      />
    </PluginSlot>
  );
};

export default CourseAboutSidebarCoursePriceSlot;

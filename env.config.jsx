import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

import BuyCourseEnrollmentButton from './src/plugins/BuyCourseEnrollmentButton';

const ENROLLMENT_BUTTON_SLOT =
  'org.openedx.frontend.catalog.course_about_page.enrollment_button';

export default {
  pluginSlots: {
    [ENROLLMENT_BUTTON_SLOT]: {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'sherab_buy_course_enrollment_button',
            type: DIRECT_PLUGIN,
            RenderWidget: BuyCourseEnrollmentButton,
          },
        },
      ],
    },
  },
};

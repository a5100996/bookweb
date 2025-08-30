export const colors = {
  light: {
    primary: {
      50: '#F0FDF4',
      100: '#DCFCE7',
      200: '#BBF7D0',
      300: '#86EFAC',
      400: '#4ADE80',
      500: '#22543D', // 雲杉綠
      600: '#16A34A',
      700: '#15803D',
      800: '#166534',
      900: '#14532D',
    },
    secondary: {
      50: '#FEFCE8',
      100: '#FEF9C3',
      200: '#FEF08A',
      300: '#FDE047',
      400: '#FACC15',
      500: '#F7FAFC', // 稻田米
      600: '#CA8A04',
      700: '#A16207',
      800: '#854D0E',
      900: '#713F12',
    },
    accent: {
      50: '#FEF2E8',
      100: '#FDECD1',
      200: '#FBD6A3',
      300: '#F8BF75',
      400: '#F5A847',
      500: '#8B4513', // 木質棕
      600: '#D97706',
      700: '#B45309',
      800: '#92400E',
      900: '#78350F',
    },
    neutral: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#1A202C', // 夜空墨
    },
    background: '#FFFFFF',
    surface: '#F9FAFB',
    text: {
      primary: '#1A202C',
      secondary: '#4B5563',
      muted: '#9CA3AF',
    }
  },
  dark: {
    primary: {
      50: '#14532D',
      100: '#166534',
      200: '#15803D',
      300: '#16A34A',
      400: '#22543D',
      500: '#4ADE80',
      600: '#86EFAC',
      700: '#BBF7D0',
      800: '#DCFCE7',
      900: '#F0FDF4',
    },
    secondary: {
      50: '#713F12',
      100: '#854D0E',
      200: '#A16207',
      300: '#CA8A04',
      400: '#F7FAFC',
      500: '#FACC15',
      600: '#FDE047',
      700: '#FEF08A',
      800: '#FEF9C3',
      900: '#FEFCE8',
    },
    accent: {
      50: '#78350F',
      100: '#92400E',
      200: '#B45309',
      300: '#D97706',
      400: '#8B4513',
      500: '#F5A847',
      600: '#F8BF75',
      700: '#FBD6A3',
      800: '#FDECD1',
      900: '#FEF2E8',
    },
    neutral: {
      50: '#1A202C',
      100: '#1F2937',
      200: '#374151',
      300: '#4B5563',
      400: '#6B7280',
      500: '#9CA3AF',
      600: '#D1D5DB',
      700: '#E5E7EB',
      800: '#F3F4F6',
      900: '#F9FAFB',
    },
    background: '#1A202C',
    surface: '#1F2937',
    text: {
      primary: '#F9FAFB',
      secondary: '#D1D5DB',
      muted: '#9CA3AF',
    }
  }
};

export const getThemeColors = (isDark: boolean) => {
  return isDark ? colors.dark : colors.light;
};
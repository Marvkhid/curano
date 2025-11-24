export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Urgent':
      return 'bg-[#FEF3C7] text-[#92400E]';
    case 'Emergency':
      return 'bg-[#FEE2E2] text-[#991B1B]';
    case 'Past Patient':
      return 'bg-[#E5E7EB] text-[#374151]';
    case 'Treated':
      return 'bg-[#D1FAE5] text-[#065F46]';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

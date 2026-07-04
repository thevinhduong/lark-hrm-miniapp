/**
 * Hiring Management Hub - Lark Workplace Block
 * App entry point + shared mock data
 */

// Use UI Avatars API as fallback (initials-based avatars)
function avatar(name) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=303030&color=fff&bold=true&size=128`
}

// ============================================
// Mock Job Orders (extended with detail fields)
// ============================================
const MOCK_JOB_ORDERS = [
  {
    id: '1',
    title: 'Backend Developer',
    department: 'Engineering',
    level: 'Senior',
    count: 2,
    status: 'approved',
    statusLabel: 'Đã duyệt',
    requesterName: 'Nguyễn Văn An',
    requesterAvatar: avatar('Nguyễn Văn An'),
    requestDate: '03/07/2026',
    description:
      'Chúng tôi đang tìm kiếm một Backend Developer tài năng để gia nhập đội ngũ Engineering. Bạn sẽ chịu trách nhiệm thiết kế và phát triển các hệ thống backend scalable, làm việc với microservices và các giải pháp cloud-native.',
    requirements: [
      'Lý tưởng sẽ có người tài nguyện, phát triển kiến trúc microservice, xử lý hệ thống tải cao.',
      'Sử dụng các công nghệ: NestJS, gRPC, Express framework, NodeJS.',
      'Kiến trúc Java Spring Boot, Python, NodeJS.',
      'Hình thức làm việc hybrid, onsite hoặc remote tùy thuộc thỏa thuận công ty.',
    ],
    skills: ['Java', 'Spring Boot', 'MySQL', 'AWS', 'Microservices'],
    benefits: [
      'Phát triển sự nghiệp: Đào tạo bài bản, lộ trình thăng tiến rõ ràng.',
      'Phúc lợi đầy đủ: Bảo hiểm full lương, 12 ngày phép năm, thưởng Tết/Lễ.',
      'Cơ hội học hỏi: Tham gia các dự án lớn, làm việc với công nghệ hiện đại.',
    ],
    hiringManager: {
      name: 'Phạm Quang Hải',
      title: 'Phó giám đốc kỹ thuật',
      avatar: avatar('Phạm Quang Hải'),
    },
    deadline: '31/07/2026',
    location: 'Hà Nội',
    workType: 'Hybrid',
    salary: '40-65 triệu',
    workflow: [
      { status: 'done', title: 'Tạo yêu cầu đầu', meta: 'Nguyễn Văn An · 03/07/2026' },
      { status: 'done', title: 'Trưởng bộ phận duyệt', meta: 'Trần Văn Bình · 04/07/2026' },
      { status: 'active', title: 'HR duyệt', meta: 'Đang xử lý · 05/07/2026' },
      { status: 'pending', title: 'Hoàn tất', meta: 'Dự kiến 06/07/2026' },
    ],
  },
  {
    id: '2',
    title: 'Product Designer',
    department: 'Product',
    level: 'Mid-level',
    count: 1,
    status: 'approved',
    statusLabel: 'Đã duyệt',
    requesterName: 'Trần Thị Mai',
    requesterAvatar: avatar('Trần Thị Mai'),
    requestDate: '01/07/2026',
    description:
      'Tìm kiếm Product Designer có tư duy sản phẩm mạnh để join team Product.',
    requirements: [
      '3+ năm kinh nghiệm Product Design',
      'Thành thạo Figma và prototyping tools',
      'Hiểu biết về design systems',
    ],
    skills: ['Figma', 'Design System', 'Prototyping'],
    benefits: ['Lương cạnh tranh', 'Flexible hours', 'Môi trường design-driven'],
    hiringManager: {
      name: 'Lê Khánh Vy',
      title: 'Head of Product',
      avatar: avatar('Lê Khánh Vy'),
    },
    deadline: '15/07/2026',
    location: 'TP. Hồ Chí Minh',
    workType: 'Hybrid',
    salary: '25-35 triệu',
    workflow: [
      { status: 'done', title: 'Tạo yêu cầu đầu', meta: 'Trần Thị Mai · 01/07/2026' },
      { status: 'done', title: 'Trưởng bộ phận duyệt', meta: 'Đã duyệt · 02/07/2026' },
      { status: 'done', title: 'HR duyệt', meta: 'Đã duyệt · 03/07/2026' },
      { status: 'done', title: 'Hoàn tất', meta: 'Phát hành · 03/07/2026' },
    ],
  },
  {
    id: '3',
    title: 'QA Engineer',
    department: 'Quality Assurance',
    level: 'Junior',
    count: 1,
    status: 'approved',
    statusLabel: 'Đã duyệt',
    requesterName: 'Lê Minh Đức',
    requesterAvatar: avatar('Lê Minh Đức'),
    requestDate: '28/06/2026',
    description:
      'Vị trí QA Engineer cho đội ngũ Quality Assurance.',
    requirements: [
      '0-2 năm kinh nghiệm QA',
      'Hiểu biết cơ bản về SQL, API testing',
      'Tư duy logic, chi tiết, cẩn thận',
    ],
    skills: ['Manual Testing', 'API Testing', 'SQL'],
    benefits: ['Lương khởi điểm 12-18 triệu', 'Đào tạo bài bản'],
    hiringManager: {
      name: 'Phạm Thanh Hà',
      title: 'QA Lead',
      avatar: avatar('Phạm Thanh Hà'),
    },
    deadline: '20/07/2026',
    location: 'Đà Nẵng',
    workType: 'Onsite',
    salary: '12-18 triệu',
    workflow: [
      { status: 'done', title: 'Tạo yêu cầu đầu', meta: 'Lê Minh Đức · 28/06/2026' },
      { status: 'done', title: 'Trưởng bộ phận duyệt', meta: 'Đã duyệt · 29/06/2026' },
      { status: 'done', title: 'HR duyệt', meta: 'Đã duyệt · 30/06/2026' },
      { status: 'done', title: 'Hoàn tất', meta: 'Phát hành · 30/06/2026' },
    ],
  },
]

// ============================================
// Mock Candidates
// ============================================
const MOCK_CANDIDATES = [
  // Backend Developer (job 1) — 8 candidates
  {
    id: 'c-101',
    jobOrderId: '1',
    name: 'Đặng Minh Quân',
    avatar: avatar('Đặng Minh Quân'),
    email: 'quan.dang@example.com',
    currentTitle: 'Senior Backend Engineer',
    currentCompany: 'VNG Corporation',
    yearsOfExperience: 6,
    stage: 'interview',
    rating: 4.5,
    appliedDate: '05/07/2026',
    source: 'LinkedIn',
    skills: ['Node.js', 'PostgreSQL', 'Kubernetes', 'Redis'],
  },
  {
    id: 'c-102',
    jobOrderId: '1',
    name: 'Ngô Thị Hương',
    avatar: avatar('Ngô Thị Hương'),
    email: 'huong.ngo@example.com',
    currentTitle: 'Backend Developer',
    currentCompany: 'Tiki',
    yearsOfExperience: 4,
    stage: 'offer',
    rating: 4.0,
    appliedDate: '03/07/2026',
    source: 'Referral',
    skills: ['Go', 'gRPC', 'Kafka', 'AWS'],
  },
  {
    id: 'c-103',
    jobOrderId: '1',
    name: 'Phan Văn Khoa',
    avatar: avatar('Phan Văn Khoa'),
    email: 'khoa.phan@example.com',
    currentTitle: 'Software Engineer',
    currentCompany: 'FPT Software',
    yearsOfExperience: 5,
    stage: 'screening',
    rating: 3.5,
    appliedDate: '06/07/2026',
    source: 'TopCV',
    skills: ['Java', 'Spring Boot', 'PostgreSQL'],
  },
  {
    id: 'c-104',
    jobOrderId: '1',
    name: 'Lý Thanh Tú',
    avatar: avatar('Lý Thanh Tú'),
    email: 'tu.ly@example.com',
    currentTitle: 'Backend Engineer',
    currentCompany: 'MoMo',
    yearsOfExperience: 4,
    stage: 'screening',
    rating: 4.0,
    appliedDate: '07/07/2026',
    source: 'Lark Form',
    skills: ['Node.js', 'TypeScript', 'MongoDB'],
  },
  {
    id: 'c-105',
    jobOrderId: '1',
    name: 'Võ Hải Yến',
    avatar: avatar('Võ Hải Yến'),
    email: 'yen.vo@example.com',
    currentTitle: 'Senior Software Engineer',
    currentCompany: 'ZaloPay',
    yearsOfExperience: 7,
    stage: 'applied',
    rating: 0,
    appliedDate: '08/07/2026',
    source: 'LinkedIn',
    skills: ['Go', 'Microservices', 'Kafka', 'gRPC'],
  },
  {
    id: 'c-106',
    jobOrderId: '1',
    name: 'Trịnh Đức Thành',
    avatar: avatar('Trịnh Đức Thành'),
    email: 'thanh.trinh@example.com',
    currentTitle: 'Tech Lead',
    currentCompany: 'VinAI',
    yearsOfExperience: 8,
    stage: 'rejected',
    rating: 3.0,
    appliedDate: '02/07/2026',
    source: 'Referral',
    skills: ['Python', 'Django', 'AWS'],
  },
  {
    id: 'c-107',
    jobOrderId: '1',
    name: 'Bùi Khánh Linh',
    avatar: avatar('Bùi Khánh Linh'),
    email: 'linh.bui@example.com',
    currentTitle: 'Backend Developer',
    currentCompany: 'Grab Vietnam',
    yearsOfExperience: 3,
    stage: 'hired',
    rating: 5.0,
    appliedDate: '01/07/2026',
    source: 'LinkedIn',
    skills: ['Node.js', 'GraphQL', 'PostgreSQL'],
  },
  {
    id: 'c-108',
    jobOrderId: '1',
    name: 'Đào Sơn Tùng',
    avatar: avatar('Đào Sơn Tùng'),
    email: 'tung.dao@example.com',
    currentTitle: 'Senior Engineer',
    currentCompany: 'Shopee',
    yearsOfExperience: 5,
    stage: 'interview',
    rating: 4.0,
    appliedDate: '04/07/2026',
    source: 'TopCV',
    skills: ['Java', 'Spring', 'Kafka'],
  },

  // Product Designer (job 2) — 5 candidates
  {
    id: 'c-201',
    jobOrderId: '2',
    name: 'Lê Thị Mai Anh',
    avatar: avatar('Lê Thị Mai Anh'),
    email: 'maianh.le@example.com',
    currentTitle: 'Backend Developer',
    currentCompany: 'Be Group',
    yearsOfExperience: 4,
    stage: 'interview',
    rating: 4.5,
    appliedDate: '04/07/2026',
    source: 'LinkedIn',
    skills: ['Figma', 'Design System', 'Prototyping'],
  },
  {
    id: 'c-202',
    jobOrderId: '2',
    name: 'Trần Minh Quân',
    avatar: avatar('Trần Minh Quân'),
    email: 'quan.tran@example.com',
    currentTitle: 'Product Designer',
    currentCompany: 'VNLife',
    yearsOfExperience: 3,
    stage: 'screening',
    rating: 4.0,
    appliedDate: '06/07/2026',
    source: 'Referral',
    skills: ['Figma', 'User Research', 'Webflow'],
  },
  {
    id: 'c-203',
    jobOrderId: '2',
    name: 'Phạm Thu Hương',
    avatar: avatar('Phạm Thu Hương'),
    email: 'huong.pham@example.com',
    currentTitle: 'Marketing Specialist',
    currentCompany: 'Tinh tế',
    yearsOfExperience: 6,
    stage: 'offer',
    rating: 5.0,
    appliedDate: '02/07/2026',
    source: 'LinkedIn',
    skills: ['Figma', 'Branding', 'Motion'],
  },
  {
    id: 'c-204',
    jobOrderId: '2',
    name: 'Nguyễn Hoàng Nam',
    avatar: avatar('Nguyễn Hoàng Nam'),
    email: 'nam.nguyen@example.com',
    currentTitle: 'QA Engineer',
    currentCompany: 'Lazada',
    yearsOfExperience: 5,
    stage: 'rejected',
    rating: 2.5,
    appliedDate: '01/07/2026',
    source: 'TopCV',
    skills: ['Figma', 'Sketch'],
  },
  {
    id: 'c-205',
    jobOrderId: '2',
    name: 'Đỗ Thanh Tâm',
    avatar: avatar('Đỗ Thanh Tâm'),
    email: 'tam.do@example.com',
    currentTitle: 'UI Designer',
    currentCompany: 'Freelance',
    yearsOfExperience: 2,
    stage: 'applied',
    rating: 0,
    appliedDate: '08/07/2026',
    source: 'Lark Form',
    skills: ['Figma', 'Illustrator'],
  },

  // QA Engineer (job 3) — 3 candidates
  {
    id: 'c-301',
    jobOrderId: '3',
    name: 'Đinh Thị Lan Anh',
    avatar: avatar('Đinh Thị Lan Anh'),
    email: 'lananh.dinh@example.com',
    currentTitle: 'Junior QA',
    currentCompany: 'NashTech',
    yearsOfExperience: 1,
    stage: 'screening',
    rating: 3.5,
    appliedDate: '03/07/2026',
    source: 'TopCV',
    skills: ['Manual Testing', 'Postman', 'SQL'],
  },
  {
    id: 'c-302',
    jobOrderId: '3',
    name: 'Cao Tiến Đạt',
    avatar: avatar('Cao Tiến Đạt'),
    email: 'dat.cao@example.com',
    currentTitle: 'Fresher',
    currentCompany: 'Newbie',
    yearsOfExperience: 0,
    stage: 'applied',
    rating: 0,
    appliedDate: '05/07/2026',
    source: 'Lark Form',
    skills: ['Manual Testing', 'JIRA'],
  },
  {
    id: 'c-303',
    jobOrderId: '3',
    name: 'Nguyễn Thị Thảo',
    avatar: avatar('Nguyễn Thị Thảo'),
    email: 'thao.nguyen@example.com',
    currentTitle: 'QA Engineer',
    currentCompany: 'Sendo',
    yearsOfExperience: 2,
    stage: 'interview',
    rating: 4.0,
    appliedDate: '02/07/2026',
    source: 'Referral',
    skills: ['Automation', 'Playwright', 'API Testing'],
  },
]

// ============================================
// Helpers exposed via globalData
// ============================================
function getJobOrderById(id) {
  return MOCK_JOB_ORDERS.find(j => j.id === String(id)) || null
}

function getCandidatesByJobId(jobOrderId, stage) {
  let list = MOCK_CANDIDATES.filter(c => c.jobOrderId === String(jobOrderId))
  if (stage && stage !== 'all') {
    list = list.filter(c => c.stage === stage)
  }
  return list
}

function summarizeCandidateStages(jobOrderId) {
  const summary = {
    applied: 0,
    screening: 0,
    interview: 0,
    offer: 0,
    hired: 0,
    rejected: 0,
    total: 0,
  }
  for (const c of MOCK_CANDIDATES) {
    if (c.jobOrderId === String(jobOrderId)) {
      summary[c.stage]++
      summary.total++
    }
  }
  return summary
}

App({
  onLaunch() {
    console.log('[HRM Block] App launched')
  },

  globalData: {
    appID: 'cli_a92ec64c69b8ded1',
    blockTypeID: 'blk_69a47a51c8800ede6d63de15',
    MOCK_JOB_ORDERS,
    MOCK_CANDIDATES,
    getJobOrderById,
    getCandidatesByJobId,
    summarizeCandidateStages,
  },
})
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RecruitmentListPage from '@/pages/RecruitmentListPage'
import RecruitmentDetailPage from '@/pages/RecruitmentDetailPage'
import CandidateManagementPage from '@/pages/CandidateManagementPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecruitmentListPage />} />
        <Route path="/recruitment/:id" element={<RecruitmentDetailPage />} />
        <Route
          path="/recruitment/:id/candidates"
          element={<CandidateManagementPage />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastProvider } from './components/Toast'
import { HomePage } from './pages/HomePage'
import { ExpensesPage } from './pages/ExpensesPage'
import { AddExpensePage } from './pages/AddExpensePage'
import { ExpenseDetailPage } from './pages/ExpenseDetailPage'
import { SummaryPage } from './pages/SummaryPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/expenses/new" element={<AddExpensePage />} />
            <Route path="/expenses/:id" element={<ExpenseDetailPage />} />
            <Route path="/summary" element={<SummaryPage />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>
  )
}

export default App

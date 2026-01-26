// 전역 변수
let currentPage = 1;
let currentLimit = 20;
let therapeuticAreaChart = null;
let sponsorsChart = null;

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
  loadSummary();
  loadTherapeuticAreaChart();
  loadSponsorsChart();
  loadApprovals();
  
  // 검색 버튼 이벤트
  document.getElementById('search-btn').addEventListener('click', handleSearch);
  document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  });
  
  // 페이지네이션 버튼 이벤트
  document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      loadApprovals();
    }
  });
  
  document.getElementById('next-page').addEventListener('click', () => {
    currentPage++;
    loadApprovals();
  });
});

// 요약 통계 로드
async function loadSummary() {
  try {
    const response = await axios.get('/api/dashboard/summary');
    const data = response.data;
    
    document.getElementById('total-count').textContent = data.total;
    document.getElementById('oncology-count').textContent = data.oncology;
    document.getElementById('novel-count').textContent = data.novel;
    document.getElementById('biosimilar-count').textContent = data.biosimilar;
    document.getElementById('orphan-count').textContent = data.orphan;
  } catch (error) {
    console.error('Failed to load summary:', error);
    alert('요약 통계를 불러오는데 실패했습니다.');
  }
}

// 치료영역별 분포 차트
async function loadTherapeuticAreaChart() {
  try {
    const response = await axios.get('/api/dashboard/therapeutic-area');
    const data = response.data;
    
    const labels = data.map(item => truncateText(item.therapeutic_area, 30));
    const counts = data.map(item => item.count);
    
    const ctx = document.getElementById('therapeuticAreaChart').getContext('2d');
    
    // 기존 차트가 있으면 제거
    if (therapeuticAreaChart) {
      therapeuticAreaChart.destroy();
    }
    
    therapeuticAreaChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: counts,
          backgroundColor: [
            '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
            '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
          ],
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              boxWidth: 15,
              font: {
                size: 11
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = data[context.dataIndex].therapeutic_area;
                const count = context.parsed;
                return label + ': ' + count + '건';
              }
            }
          }
        }
      }
    });
  } catch (error) {
    console.error('Failed to load therapeutic area chart:', error);
  }
}

// 제약사별 승인 건수 차트
async function loadSponsorsChart() {
  try {
    const response = await axios.get('/api/dashboard/sponsors?limit=10');
    const data = response.data;
    
    const labels = data.map(item => truncateText(item.sponsor, 20));
    const counts = data.map(item => item.count);
    
    const ctx = document.getElementById('sponsorsChart').getContext('2d');
    
    // 기존 차트가 있으면 제거
    if (sponsorsChart) {
      sponsorsChart.destroy();
    }
    
    sponsorsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '승인 건수',
          data: counts,
          backgroundColor: '#10B981',
          borderColor: '#059669',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const sponsor = data[context.dataIndex].sponsor;
                const count = context.parsed.y;
                return sponsor + ': ' + count + '건';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  } catch (error) {
    console.error('Failed to load sponsors chart:', error);
  }
}

// 승인 목록 로드
async function loadApprovals() {
  try {
    const response = await axios.get(`/api/approvals?page=${currentPage}&limit=${currentLimit}`);
    const data = response.data;
    
    renderApprovalsTable(data.data);
    updatePagination(data.pagination);
  } catch (error) {
    console.error('Failed to load approvals:', error);
    alert('승인 목록을 불러오는데 실패했습니다.');
  }
}

// 테이블 렌더링
function renderApprovalsTable(approvals) {
  const tbody = document.getElementById('approvals-table');
  tbody.innerHTML = '';
  
  if (approvals.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="px-6 py-8 text-center text-gray-500">
          <i class="fas fa-inbox text-4xl mb-2"></i>
          <p>데이터가 없습니다.</p>
        </td>
      </tr>
    `;
    return;
  }
  
  approvals.forEach(approval => {
    const row = document.createElement('tr');
    row.className = 'hover:bg-gray-50';
    
    // 구분 뱃지
    const badges = [];
    if (approval.is_oncology === 'Y') {
      badges.push('<span class="px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-800">항암제</span>');
    }
    if (approval.is_novel === 'Y') {
      badges.push('<span class="px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-800">신약</span>');
    }
    if (approval.is_biosimilar === 'Y') {
      badges.push('<span class="px-2 py-1 text-xs font-semibold rounded bg-purple-100 text-purple-800">바이오시밀러</span>');
    }
    if (approval.is_orphan === 'Y') {
      badges.push('<span class="px-2 py-1 text-xs font-semibold rounded bg-orange-100 text-orange-800">희귀의약품</span>');
    }
    
    row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        ${formatDate(approval.approval_date)}
      </td>
      <td class="px-6 py-4 text-sm text-gray-900">
        <div class="font-medium">${escapeHtml(approval.product_name || 'N/A')}</div>
        <div class="text-xs text-gray-500">${escapeHtml(approval.nda_bla_number || '-')}</div>
      </td>
      <td class="px-6 py-4 text-sm text-gray-700">
        ${escapeHtml(approval.active_ingredient || 'N/A')}
      </td>
      <td class="px-6 py-4 text-sm text-gray-700">
        ${escapeHtml(approval.sponsor || 'N/A')}
      </td>
      <td class="px-6 py-4 text-sm text-gray-600">
        ${truncateText(approval.therapeutic_area || 'Not specified', 30)}
      </td>
      <td class="px-6 py-4 text-sm">
        <div class="flex flex-wrap gap-1">
          ${badges.join('')}
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm">
        <button onclick="viewDetail(${approval.id})" 
                class="text-blue-600 hover:text-blue-800 font-medium">
          <i class="fas fa-eye mr-1"></i>상세
        </button>
      </td>
    `;
    
    tbody.appendChild(row);
  });
}

// 페이지네이션 업데이트
function updatePagination(pagination) {
  const info = document.getElementById('pagination-info');
  info.textContent = `전체 ${pagination.total}건 | ${pagination.page} / ${pagination.totalPages} 페이지`;
  
  const prevBtn = document.getElementById('prev-page');
  const nextBtn = document.getElementById('next-page');
  
  prevBtn.disabled = pagination.page <= 1;
  nextBtn.disabled = pagination.page >= pagination.totalPages;
}

// 검색 처리
async function handleSearch() {
  const searchInput = document.getElementById('search-input');
  const query = searchInput.value.trim();
  
  if (!query) {
    loadApprovals();
    return;
  }
  
  try {
    const response = await axios.get(`/api/approvals/search/${encodeURIComponent(query)}`);
    const data = response.data;
    
    renderApprovalsTable(data);
    
    const info = document.getElementById('pagination-info');
    info.textContent = `검색 결과: ${data.length}건`;
    
    // 검색 모드에서는 페이지네이션 비활성화
    document.getElementById('prev-page').disabled = true;
    document.getElementById('next-page').disabled = true;
  } catch (error) {
    console.error('Search failed:', error);
    alert('검색에 실패했습니다.');
  }
}

// 상세 정보 보기
async function viewDetail(id) {
  try {
    const response = await axios.get(`/api/approvals/${id}`);
    const approval = response.data;
    
    const modalContent = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onclick="closeModal(event)">
        <div class="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
          <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 class="text-xl font-semibold text-gray-900">
              <i class="fas fa-info-circle text-blue-600 mr-2"></i>
              승인 상세 정보
            </h3>
            <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          <div class="px-6 py-4 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">제품명</label>
              <p class="mt-1 text-sm text-gray-900">${escapeHtml(approval.product_name || 'N/A')}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">주성분</label>
              <p class="mt-1 text-sm text-gray-900">${escapeHtml(approval.active_ingredient || 'N/A')}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">제약사</label>
              <p class="mt-1 text-sm text-gray-900">${escapeHtml(approval.sponsor || 'N/A')}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">적응증</label>
              <p class="mt-1 text-sm text-gray-900">${escapeHtml(approval.indication || 'N/A')}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">치료영역</label>
              <p class="mt-1 text-sm text-gray-900">${escapeHtml(approval.therapeutic_area || 'N/A')}</p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">승인일</label>
                <p class="mt-1 text-sm text-gray-900">${formatDate(approval.approval_date)}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">승인 유형</label>
                <p class="mt-1 text-sm text-gray-900">${escapeHtml(approval.approval_type || 'N/A')}</p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">NDA/BLA 번호</label>
                <p class="mt-1 text-sm text-gray-900">${escapeHtml(approval.nda_bla_number || 'N/A')}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">신청 유형</label>
                <p class="mt-1 text-sm text-gray-900">${escapeHtml(approval.application_type || 'N/A')}</p>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">비고</label>
              <p class="mt-1 text-sm text-gray-900">${escapeHtml(approval.remarks || 'N/A')}</p>
            </div>
            ${approval.fda_drugs_url ? `
              <div>
                <a href="${escapeHtml(approval.fda_drugs_url)}" target="_blank" 
                   class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <i class="fas fa-external-link-alt mr-2"></i>
                  FDA 페이지 보기
                </a>
              </div>
            ` : ''}
          </div>
          <div class="px-6 py-4 border-t border-gray-200 flex justify-end">
            <button onclick="closeModal()" 
                    class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              닫기
            </button>
          </div>
        </div>
      </div>
    `;
    
    const modal = document.createElement('div');
    modal.id = 'detail-modal';
    modal.innerHTML = modalContent;
    document.body.appendChild(modal);
  } catch (error) {
    console.error('Failed to load detail:', error);
    alert('상세 정보를 불러오는데 실패했습니다.');
  }
}

// 모달 닫기
function closeModal(event) {
  if (event && event.target !== event.currentTarget) {
    return;
  }
  const modal = document.getElementById('detail-modal');
  if (modal) {
    modal.remove();
  }
}

// 유틸리티 함수
function formatDate(dateString) {
  if (!dateString) return 'N/A';
  return dateString;
}

function truncateText(text, maxLength) {
  if (!text) return 'N/A';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

import React, { useEffect, useState, useMemo } from 'react';
import { Order, User, OrderStatus } from '../types';
import { getOrders, updateOrderStatus } from '../services/dbService';
import { 
  Loader2, Package, User as UserIcon, CheckCircle, 
  Clock, DollarSign, ChevronDown, ChevronUp, 
  PlayCircle, Search, Filter, ArrowLeft, ArrowRight,
  CheckSquare, Square, X, TrendingUp, Activity, Shield,
  FileSignature, Smartphone, Layout, AlertCircle
} from 'lucide-react';

interface AdminDashboardProps {
  user: User;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // Selection State
  const [selectedOrderIds, setSelectedOrderIds] = useState<Set<string>>(new Set());
  const [isBulkActionLoading, setIsBulkActionLoading] = useState(false);

  const fetchOrders = async () => {
    setIsLoading(true);
    // Now using server-side security via the service
    const data = await getOrders(user.id, user.isAdmin);
    setOrders(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  // --- Computed Data ---

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        order.id.toLowerCase().includes(query) ||
        order.userEmail.toLowerCase().includes(query) ||
        order.userName.toLowerCase().includes(query) ||
        order.planName.toLowerCase().includes(query) ||
        (order.domainName && order.domainName.toLowerCase().includes(query));
      
      return matchesStatus && matchesSearch;
    });
  }, [orders, statusFilter, searchQuery]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredOrders, currentPage]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((acc, curr) => acc + curr.paidAmount, 0);
    const pendingCount = orders.filter(o => o.status === 'pending').length;
    const activeCount = orders.filter(o => o.status === 'in_progress').length;
    return { totalRevenue, pendingCount, activeCount };
  }, [orders]);

  // --- Handlers ---

  const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
      if (!user.isAdmin) return;
      await updateOrderStatus(orderId, { status: newStatus });
      fetchOrders();
  };

  const handlePaymentUpdate = async (orderId: string, order: Order) => {
      // This works for both Admin (manual collect) or User (paying due)
      // For this simulation, we assume immediate success
      await updateOrderStatus(orderId, { 
          paymentStatus: 'paid', 
          paidAmount: order.totalAmount,
          dueAmount: 0 
      });
      alert("Payment Successful! Full access granted.");
      fetchOrders();
  };

  const toggleSelectAll = () => {
    if (selectedOrderIds.size === paginatedOrders.length && paginatedOrders.length > 0) {
      setSelectedOrderIds(new Set());
    } else {
      const newSet = new Set(paginatedOrders.map(o => o.id));
      setSelectedOrderIds(newSet);
    }
  };

  const toggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSet = new Set(selectedOrderIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedOrderIds(newSet);
  };

  const handleBulkAction = async (status: OrderStatus) => {
    if (selectedOrderIds.size === 0) return;
    setIsBulkActionLoading(true);
    try {
      await Promise.all(
        Array.from(selectedOrderIds).map((id) => updateOrderStatus(id as string, { status }))
      );
      setSelectedOrderIds(new Set());
      await fetchOrders();
    } catch (error) {
      console.error("Bulk update failed", error);
    } finally {
      setIsBulkActionLoading(false);
    }
  };

  // --- Helpers ---

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
          case 'approved': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
          case 'in_progress': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
          case 'delivered': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
          case 'completed': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
          default: return 'bg-slate-700 text-slate-400';
      }
  };

  // --- USER AGREEMENT VIEW ---
  const UserAgreementView = () => (
    <div className="space-y-8">
      {orders.map(order => (
        <div key={order.id} className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
          {/* Agreement Header */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 border-b border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileSignature className="w-5 h-5 text-brand-400" />
                <h2 className="text-xl font-bold text-white">Digital Service Agreement</h2>
              </div>
              <p className="text-slate-400 text-sm">Order ID: #{order.id}</p>
            </div>
            <div className={`px-4 py-2 rounded-lg border ${getStatusColor(order.status)} flex items-center`}>
              <Activity className="w-4 h-4 mr-2" />
              <span className="font-bold uppercase text-sm">{order.status.replace('_', ' ')}</span>
            </div>
          </div>

          <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Column 1: Project Info */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Project Details</h3>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 space-y-4">
                 <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-900/50 flex items-center justify-center flex-shrink-0">
                       <Layout className="w-5 h-5 text-brand-400" />
                    </div>
                    <div>
                       <p className="text-xs text-slate-400">Package Plan</p>
                       <p className="text-white font-bold">{order.planName}</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                       <Smartphone className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                       <p className="text-xs text-slate-400">Domain / Project Name</p>
                       <p className="text-white font-bold break-all">{order.domainName || 'N/A'}</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-900/20 flex items-center justify-center flex-shrink-0">
                       <Clock className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                       <p className="text-xs text-slate-400">Start Date</p>
                       <p className="text-white font-bold">{formatDate(order.createdAt)}</p>
                    </div>
                 </div>
              </div>
            </div>

            {/* Column 2: Scope of Work */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Scope of Work</h3>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 h-full">
                 <ul className="space-y-2">
                    {order.planFeatures?.map((feature, idx) => (
                       <li key={idx} className="flex items-start text-sm text-slate-300">
                          <CheckCircle className="w-4 h-4 text-brand-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                       </li>
                    )) || <li className="text-slate-500 italic">Features not listed</li>}
                 </ul>
              </div>
            </div>

            {/* Column 3: Financials & Timeline */}
            <div className="space-y-6">
               <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Financial Status</h3>
               <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 space-y-3">
                  <div className="flex justify-between text-sm">
                     <span className="text-slate-400">Total Agreement Value</span>
                     <span className="text-white font-bold">৳{order.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span className="text-emerald-400">Paid (Advance)</span>
                     <span className="text-emerald-400 font-bold">- ৳{order.paidAmount.toLocaleString()}</span>
                  </div>
                  <div className="h-px bg-slate-700"></div>
                  <div className="flex justify-between items-center">
                     <span className="text-white font-medium">Due Amount</span>
                     <span className={`font-bold text-lg ${order.dueAmount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                        ৳{order.dueAmount.toLocaleString()}
                     </span>
                  </div>

                  {order.dueAmount > 0 && order.status === 'delivered' && (
                     <button 
                        onClick={() => handlePaymentUpdate(order.id, order)}
                        className="w-full mt-4 bg-brand-600 hover:bg-brand-500 text-white py-2 rounded-lg font-bold flex items-center justify-center animate-pulse"
                     >
                        Pay Due & Get Access
                     </button>
                  )}
               </div>

               <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-6">Timeline</h3>
               <div className="relative pl-4 border-l-2 border-slate-700 space-y-6">
                  <div className="relative">
                     <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full ${order.status !== 'pending' ? 'bg-emerald-500' : 'bg-slate-600'}`}></div>
                     <p className="text-sm font-bold text-white">Order Placed</p>
                     <p className="text-xs text-slate-500">50% Advance Paid</p>
                  </div>
                  <div className="relative">
                     <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full ${['in_progress','delivered','completed'].includes(order.status) ? 'bg-emerald-500' : 'bg-slate-600'}`}></div>
                     <p className="text-sm font-bold text-white">Design Preview (WhatsApp)</p>
                     <p className="text-xs text-slate-500">Discuss requirements</p>
                  </div>
                  <div className="relative">
                     <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full ${['delivered','completed'].includes(order.status) ? 'bg-emerald-500' : 'bg-slate-600'}`}></div>
                     <p className="text-sm font-bold text-white">Development & Handover</p>
                     <p className="text-xs text-slate-500">Admin marks as Delivered</p>
                  </div>
                  <div className="relative">
                     <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full ${order.status === 'completed' ? 'bg-emerald-500' : 'bg-slate-600'}`}></div>
                     <p className="text-sm font-bold text-white">Project Completion</p>
                     <p className="text-xs text-slate-500">Due Cleared</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      ))}
      
      {orders.length === 0 && (
         <div className="text-center py-12 bg-slate-800/50 rounded-xl border border-slate-700">
            <AlertCircle className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <h3 className="text-xl text-white font-medium">No Active Agreements</h3>
            <p className="text-slate-400">Select a package from the home page to start.</p>
         </div>
      )}
    </div>
  );

  return (
    <section className="pt-32 pb-24 bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-white">{user.isAdmin ? 'Admin Console' : 'My Projects'}</h1>
              {user.isAdmin && (
                <span className="flex items-center px-2 py-0.5 rounded text-xs font-bold bg-brand-500/20 text-brand-400 border border-brand-500/30">
                  <Shield className="w-3 h-3 mr-1" /> Secure Mode
                </span>
              )}
            </div>
            <p className="text-slate-400 mt-2">
                {user.isAdmin ? 'Oversee orders, manage workflow, and track revenue.' : 'View your service agreements and project status.'}
            </p>
          </div>
          
          {user.isAdmin && (
            <div className="flex gap-4">
              <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700 flex flex-col items-end">
                 <span className="text-xs text-slate-500 uppercase font-bold">Revenue</span>
                 <div className="flex items-center text-emerald-400 font-bold">
                   <TrendingUp className="w-4 h-4 mr-1" />
                   ৳{stats.totalRevenue.toLocaleString()}
                 </div>
              </div>
              <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700 flex flex-col items-end">
                 <span className="text-xs text-slate-500 uppercase font-bold">Pending</span>
                 <div className="flex items-center text-yellow-400 font-bold">
                   <Activity className="w-4 h-4 mr-1" />
                   {stats.pendingCount}
                 </div>
              </div>
            </div>
          )}
        </div>

        {/* USER VIEW: AGREEMENT DASHBOARD */}
        {!user.isAdmin ? (
           isLoading ? (
             <div className="flex justify-center items-center h-64">
               <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
             </div>
           ) : (
             <UserAgreementView />
           )
        ) : (
           /* ADMIN VIEW: TABLE DASHBOARD */
           <>
            {/* Controls Bar */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center backdrop-blur-sm sticky top-20 z-40">
              <div className="flex flex-1 gap-4 w-full md:w-auto">
                {/* Search */}
                <div className="relative flex-1 md:max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Search orders, emails..." 
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
                
                {/* Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <select 
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value as any); setCurrentPage(1); }}
                    className="bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-8 py-2 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="in_progress">In Progress</option>
                    <option value="delivered">Delivered</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              
              {/* Bulk Actions (Admin Only) */}
              {selectedOrderIds.size > 0 && (
                <div className="flex items-center gap-2 animate-fade-in-up w-full md:w-auto justify-end border-t md:border-t-0 border-slate-700 pt-4 md:pt-0">
                  <span className="text-sm text-slate-400 mr-2">{selectedOrderIds.size} selected</span>
                  
                  <button 
                    onClick={() => handleBulkAction('approved')}
                    disabled={isBulkActionLoading}
                    className="px-3 py-1.5 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-md text-xs font-bold hover:bg-blue-600/30 transition-colors"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleBulkAction('in_progress')}
                    disabled={isBulkActionLoading}
                    className="px-3 py-1.5 bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-md text-xs font-bold hover:bg-purple-600/30 transition-colors"
                  >
                    Start Work
                  </button>
                  <button 
                    onClick={() => setSelectedOrderIds(new Set())}
                    className="p-1.5 hover:bg-slate-700 rounded text-slate-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Orders List */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="bg-slate-800 rounded-xl p-12 text-center border border-slate-700">
                <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white">No orders found</h3>
                <p className="text-slate-500 mt-2">
                  Try adjusting your search or filters.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* List Header */}
                <div className="px-6 pb-2 flex items-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                     <div className="w-8">
                       <button onClick={toggleSelectAll} className="hover:text-slate-300">
                         {selectedOrderIds.size === paginatedOrders.length && paginatedOrders.length > 0 ? <CheckSquare className="w-4 h-4 text-brand-500" /> : <Square className="w-4 h-4" />}
                       </button>
                     </div>
                     <div className="w-[250px]">Project & Client</div>
                     <div className="flex-1">Status & Finance</div>
                </div>

                {paginatedOrders.map((order) => (
                    <div key={order.id} className={`bg-slate-800/50 rounded-xl border overflow-hidden transition-all ${selectedOrderIds.has(order.id) ? 'border-brand-500/50 bg-brand-900/10' : 'border-slate-700 hover:border-slate-600'}`}>
                        {/* Row Header */}
                        <div 
                            className="p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/80"
                            onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                        >
                            <div className="flex items-center gap-4 min-w-[250px]">
                                <div onClick={(e) => toggleSelect(order.id, e)} className="cursor-pointer text-slate-500 hover:text-slate-300">
                                  {selectedOrderIds.has(order.id) ? <CheckSquare className="w-5 h-5 text-brand-500" /> : <Square className="w-5 h-5" />}
                                </div>
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center border flex-shrink-0 bg-slate-700 border-slate-600`}>
                                    <UserIcon className="w-5 h-5 text-slate-300" />
                                </div>
                                <div className="overflow-hidden">
                                    <h3 className="text-white font-bold truncate">{order.planName}</h3>
                                    <p className="text-sm text-slate-400 truncate">{order.userName}</p>
                                    <p className="text-xs text-slate-500 truncate">{order.userEmail}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 lg:gap-8 w-full lg:w-auto justify-between lg:justify-end">
                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-500 uppercase font-bold lg:hidden">Status</span>
                                    <span className={`text-sm font-medium px-2 py-0.5 rounded border mt-1 lg:mt-0 ${getStatusColor(order.status)}`}>
                                        {order.status.replace('_', ' ').toUpperCase()}
                                    </span>
                                </div>
                                
                                <div className="flex flex-col lg:items-end">
                                    <span className="text-xs text-slate-500 uppercase font-bold lg:hidden">Due Amount</span>
                                    <div className="flex items-center mt-1 lg:mt-0">
                                        {order.dueAmount <= 0 ? (
                                          <span className="text-emerald-400 text-sm font-bold flex items-center"><CheckCircle className="w-3 h-3 mr-1"/> Paid</span>
                                        ) : (
                                          <span className="text-red-400 text-sm font-bold">Due: ৳{order.dueAmount.toLocaleString()}</span>
                                        )}
                                    </div>
                                </div>
                                
                                {expandedOrderId === order.id ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                            </div>
                        </div>

                        {/* Expanded Details Panel */}
                        {expandedOrderId === order.id && (
                            <div className="bg-slate-900/50 border-t border-slate-700 p-6 animate-fade-in-up cursor-default" onClick={(e) => e.stopPropagation()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Details Column */}
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">Project Details</h4>
                                        <div className="grid grid-cols-2 gap-4 bg-slate-800 p-4 rounded-lg">
                                            <div>
                                                <p className="text-xs text-slate-500">Domain Name</p>
                                                <p className="text-white font-medium truncate">{order.domainName || 'Not specified'}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500">Order Date</p>
                                                <p className="text-white font-medium">{formatDate(order.createdAt)}</p>
                                            </div>
                                            <div className="col-span-2">
                                                <p className="text-xs text-slate-500">Client Requirements</p>
                                                <p className="text-slate-300 text-sm mt-1 bg-slate-900/50 p-3 rounded border border-slate-700/50">
                                                  {order.requirements || 'No specific requirements added.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions Column (Admin Only) */}
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold text-brand-400 uppercase tracking-wider mb-2">Admin Controls</h4>
                                        <div className="bg-slate-800 p-4 rounded-lg space-y-4">
                                            {/* Workflow Actions */}
                                            <div>
                                              <p className="text-xs text-slate-500 mb-2">Update Workflow Status</p>
                                              <div className="flex flex-wrap gap-2">
                                                  {order.status === 'pending' && (
                                                      <button 
                                                          onClick={() => handleStatusUpdate(order.id, 'approved')}
                                                          className="flex items-center px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-lg text-sm transition-colors"
                                                      >
                                                          <CheckCircle className="w-4 h-4 mr-2" /> Approve
                                                      </button>
                                                  )}
                                                  {(order.status === 'approved' || order.status === 'pending') && (
                                                      <button 
                                                          onClick={() => handleStatusUpdate(order.id, 'in_progress')}
                                                          className="flex items-center px-3 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-500/30 rounded-lg text-sm transition-colors"
                                                      >
                                                          <PlayCircle className="w-4 h-4 mr-2" /> Start Work
                                                      </button>
                                                  )}
                                                  {order.status === 'in_progress' && (
                                                      <button 
                                                          onClick={() => handleStatusUpdate(order.id, 'delivered')}
                                                          className="flex items-center px-3 py-2 bg-orange-600/20 hover:bg-orange-600/30 text-orange-400 border border-orange-500/30 rounded-lg text-sm transition-colors"
                                                      >
                                                          <Package className="w-4 h-4 mr-2" /> Deliver
                                                      </button>
                                                  )}
                                                  {(order.status === 'delivered' || order.status === 'in_progress') && (
                                                      <button 
                                                          onClick={() => handleStatusUpdate(order.id, 'completed')}
                                                          className="flex items-center px-3 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 rounded-lg text-sm transition-colors"
                                                      >
                                                          <CheckCircle className="w-4 h-4 mr-2" /> Complete
                                                      </button>
                                                  )}
                                              </div>
                                            </div>

                                            {/* Payment Actions */}
                                            <div className="pt-4 border-t border-slate-700">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="text-xs text-slate-500">Total: ৳{order.totalAmount.toLocaleString()}</p>
                                                        <p className="text-xs text-slate-500">Paid: ৳{order.paidAmount.toLocaleString()}</p>
                                                    </div>
                                                    {order.dueAmount > 0 ? (
                                                        <button 
                                                            onClick={() => handlePaymentUpdate(order.id, order)}
                                                            className="flex items-center px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm shadow-lg shadow-emerald-500/20"
                                                        >
                                                            <DollarSign className="w-4 h-4 mr-1" /> Collect ৳{order.dueAmount.toLocaleString()}
                                                        </button>
                                                    ) : (
                                                       <span className="text-xs font-bold text-emerald-500 border border-emerald-500/30 px-2 py-1 rounded">Payment Complete</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2 mt-8">
                    <button 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 disabled:opacity-50 hover:text-white hover:border-brand-500 transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-10 h-10 rounded-lg text-sm font-bold transition-colors ${
                          currentPage === i + 1
                            ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20'
                            : 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-brand-500'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 disabled:opacity-50 hover:text-white hover:border-brand-500 transition-colors"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            )}
           </>
        )}
      </div>
    </section>
  );
};
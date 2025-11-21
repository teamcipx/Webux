import React, { useEffect, useState } from 'react';
import { Order, User, OrderStatus } from '../types';
import { getOrders, updateOrderStatus } from '../services/dbService';
import { Loader2, Package, User as UserIcon, Calendar, CheckCircle, Clock, DollarSign, AlertCircle, ChevronDown, ChevronUp, PlayCircle } from 'lucide-react';

interface AdminDashboardProps {
  user: User;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const fetchOrders = async () => {
    // In a real app, filter by user ID if not admin
    // For now, we fetch all (assuming client-side filter for demo, or user is admin)
    // If regular user, we should filter.
    const data = await getOrders();
    
    if (user.isAdmin) {
        setOrders(data);
    } else {
        setOrders(data.filter(o => o.userId === user.id));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
      if (!user.isAdmin) return;
      await updateOrderStatus(orderId, { status: newStatus });
      fetchOrders();
  };

  const handlePaymentUpdate = async (orderId: string, order: Order) => {
      if (!user.isAdmin) return;
      // Mark as fully paid
      await updateOrderStatus(orderId, { 
          paymentStatus: 'paid', 
          paidAmount: order.totalAmount,
          dueAmount: 0 
      });
      fetchOrders();
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
    });
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

  return (
    <section className="pt-32 pb-24 bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">{user.isAdmin ? 'Admin Panel' : 'My Dashboard'}</h1>
            <p className="text-slate-400 mt-2">
                {user.isAdmin ? 'Manage orders, payments, and project delivery.' : 'Track your project status and payments.'}
            </p>
          </div>
          <div className="bg-brand-900/50 px-4 py-2 rounded-lg border border-brand-500/30">
             <span className="text-brand-400 font-bold text-xl">{orders.length}</span>
             <span className="text-slate-400 ml-2 font-medium">Active Orders</span>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-slate-800 rounded-xl p-12 text-center border border-slate-700">
            <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white">No orders found</h3>
            <p className="text-slate-500 mt-2">
                {user.isAdmin ? "Wait for customers to place orders." : "Go to Pricing and start a project!"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
                <div key={order.id} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden transition-all hover:border-slate-600">
                    {/* Row Header */}
                    <div 
                        className="p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/80"
                        onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                    >
                        <div className="flex items-center gap-4 min-w-[250px]">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${user.isAdmin ? 'bg-slate-700 border-slate-600' : 'bg-brand-900/50 border-brand-500/30'}`}>
                                {user.isAdmin ? <UserIcon className="w-5 h-5 text-slate-300" /> : <Package className="w-5 h-5 text-brand-400" />}
                            </div>
                            <div>
                                <h3 className="text-white font-bold">{order.planName}</h3>
                                <p className="text-sm text-slate-400">{user.isAdmin ? order.userName : `Order #${order.id.slice(0,6)}`}</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 lg:gap-8">
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 uppercase font-bold">Status</span>
                                <span className={`text-sm font-medium px-2 py-0.5 rounded border mt-1 ${getStatusColor(order.status)}`}>
                                    {order.status.replace('_', ' ').toUpperCase()}
                                </span>
                            </div>
                            
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 uppercase font-bold">Payment</span>
                                <div className="flex items-center mt-1">
                                    <span className={`w-2 h-2 rounded-full mr-2 ${order.paymentStatus === 'paid' ? 'bg-emerald-500' : 'bg-yellow-500'}`}></span>
                                    <span className="text-sm text-white font-medium capitalize">{order.paymentStatus}</span>
                                </div>
                            </div>

                            <div className="flex flex-col text-right min-w-[100px]">
                                <span className="text-xs text-slate-500 uppercase font-bold">Due Amount</span>
                                <span className={`text-sm font-bold ${order.dueAmount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                                    ৳{order.dueAmount.toLocaleString()}
                                </span>
                            </div>
                            
                            {expandedOrderId === order.id ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                        </div>
                    </div>

                    {/* Expanded Details Panel */}
                    {expandedOrderId === order.id && (
                        <div className="bg-slate-900/50 border-t border-slate-700 p-6 animate-fade-in-up">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Details Column */}
                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">Project Details</h4>
                                    <div className="grid grid-cols-2 gap-4 bg-slate-800 p-4 rounded-lg">
                                        <div>
                                            <p className="text-xs text-slate-500">Domain Name</p>
                                            <p className="text-white font-medium">{order.domainName || 'Not specified'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">Order Date</p>
                                            <p className="text-white font-medium">{formatDate(order.createdAt)}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="text-xs text-slate-500">Client Requirements</p>
                                            <p className="text-slate-300 text-sm mt-1 bg-slate-900/50 p-2 rounded">{order.requirements || 'No specific requirements added.'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions Column (Admin Only) */}
                                {user.isAdmin ? (
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold text-brand-400 uppercase tracking-wider mb-2">Admin Actions</h4>
                                        <div className="bg-slate-800 p-4 rounded-lg space-y-4">
                                            {/* Workflow Actions */}
                                            <div className="flex flex-wrap gap-3">
                                                {order.status === 'pending' && (
                                                    <button 
                                                        onClick={() => handleStatusUpdate(order.id, 'approved')}
                                                        className="flex items-center px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-lg text-sm transition-colors"
                                                    >
                                                        <CheckCircle className="w-4 h-4 mr-2" /> Approve Order
                                                    </button>
                                                )}
                                                {order.status === 'approved' && (
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
                                                        <Package className="w-4 h-4 mr-2" /> Deliver Project
                                                    </button>
                                                )}
                                                {order.status === 'delivered' && order.paymentStatus === 'paid' && (
                                                    <button 
                                                        onClick={() => handleStatusUpdate(order.id, 'completed')}
                                                        className="flex items-center px-3 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 rounded-lg text-sm transition-colors"
                                                    >
                                                        <CheckCircle className="w-4 h-4 mr-2" /> Mark Completed
                                                    </button>
                                                )}
                                            </div>

                                            {/* Payment Actions */}
                                            <div className="pt-4 border-t border-slate-700">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="text-xs text-slate-500">Total: ৳{order.totalAmount}</p>
                                                        <p className="text-xs text-slate-500">Paid: ৳{order.paidAmount}</p>
                                                    </div>
                                                    {order.dueAmount > 0 && (
                                                        <button 
                                                            onClick={() => handlePaymentUpdate(order.id, order)}
                                                            className="flex items-center px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm shadow-lg shadow-emerald-500/20"
                                                        >
                                                            <DollarSign className="w-4 h-4 mr-1" /> Mark Due Paid (৳{order.dueAmount})
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    // User View of Progress
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">Current Status</h4>
                                        <div className="bg-slate-800 p-4 rounded-lg">
                                            {order.status === 'pending' && <p className="text-slate-400 text-sm">Your order is waiting for admin approval. We will start shortly.</p>}
                                            {order.status === 'in_progress' && <p className="text-purple-400 text-sm">We are currently working on your project.</p>}
                                            {order.status === 'delivered' && (
                                                <div className="text-orange-400 text-sm">
                                                    <p className="font-bold">Project Delivered!</p>
                                                    <p>Please clear your due payment of ৳{order.dueAmount} to receive full access.</p>
                                                </div>
                                            )}
                                            {order.status === 'completed' && <p className="text-emerald-400 text-sm">Project completed successfully. Thank you!</p>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
import React, { useState, useEffect } from 'react';
import {
  Settings,
  ArrowLeft,
  LogOut,
  ExternalLink,
  Database,
  Layers,
  Globe,
  Zap,
  Truck,
  Plus,
  Search,
  CheckCircle,
  FileText,
  Code,
  Box,
  ChevronRight,
  Activity,
  Play,
  ShieldCheck,
  Rocket,
  Filter,
  Download,
  Upload,
  Brain,
  FileJson,
  Eye,
  Edit3,
  BarChart2,
  ListChecks,
  Copy,
  GanttChartSquare,
  X,
  GitBranch,
  MousePointer2,
  PlusCircle,
  Terminal,
  Save,
  Share2,
  Layout,
  Cpu,
  Monitor
} from 'lucide-react';

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('configurator');
  const [selectedLob, setSelectedLob] = useState('Personal Homeowners');
  const [activeStep, setActiveStep] = useState(0);
  const [formAiStep, setFormAiStep] = useState(0);
  const [processingProgress, setProcessingProgress] = useState(0);

  // Workflow Rules State
  const [workflowStep, setWorkflowStep] = useState(0); // 0: upload, 1: processing, 2: list, 3: edit
  const [selectedRule, setSelectedRule] = useState(null);

  // Dynamic Workflow State
  const [dwSubPage, setDwSubPage] = useState('list'); // 'list', 'designer', 'test'
  const [selectedNode, setSelectedNode] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  // Application Studio / UI Schema Generator State
  const [studioStep, setStudioStep] = useState('idle'); // 'idle', 'loading', 'result'
  const [loadingStep, setLoadingStep] = useState(0);

  // Layout Constants
  const USER_NAME = "Mayukh Roy";
  const BREADCRUMB_BASE = "BASELAB | Personal | Homeowners | ";

  // Navigation handlers
  const navigateTo = (page) => {
    setCurrentPage(page);
    setFormAiStep(0);
    setWorkflowStep(0);
    setProcessingProgress(0);
    setDwSubPage('list');
    setStudioStep('idle');
  };

  const goBack = () => {
    if (currentPage === 'integration-hub') navigateTo('configurator');
    else if (currentPage === 'data-service') navigateTo('integration-hub');
    else if (currentPage === 'iris-details') navigateTo('data-service');
    else if (currentPage === 'form-factory') navigateTo('configurator');
    else if (currentPage === 'form-ai-wizard') navigateTo('form-factory');
    else if (currentPage === 'workflow-rules') {
      if (workflowStep === 3) setWorkflowStep(2);
      else navigateTo('configurator');
    }
    else if (currentPage === 'dynamic-workflow') {
      if (dwSubPage === 'designer' || dwSubPage === 'test') setDwSubPage('list');
      else navigateTo('configurator');
    }
    else if (currentPage === 'application-studio') navigateTo('configurator');
    else if (currentPage === 'ui-schema-generator') navigateTo('application-studio');
  };

  // Simulation for loading logic
  useEffect(() => {
    let interval;
    const isProcessing = (currentPage === 'form-ai-wizard' && (formAiStep === 1 || formAiStep === 3)) ||
      (currentPage === 'workflow-rules' && workflowStep === 1) ||
      (isRunning);

    if (isProcessing) {
      setProcessingProgress(0);
      interval = setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            if (currentPage === 'workflow-rules') {
              setTimeout(() => setWorkflowStep(2), 500);
            }
            if (isRunning) {
              setIsRunning(false);
              setDwSubPage('test');
            }
            return 100;
          }
          return prev + 5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [formAiStep, workflowStep, currentPage, isRunning]);

  // UI Schema Generator Loading Logic
  useEffect(() => {
    if (studioStep === 'loading') {
      const timers = [
        setTimeout(() => setLoadingStep(1), 1500),
        setTimeout(() => setLoadingStep(2), 3000),
        setTimeout(() => setStudioStep('result'), 4500)
      ];
      return () => timers.forEach(t => clearTimeout(t));
    } else {
      setLoadingStep(0);
    }
  }, [studioStep]);

  // Sub-components
  const Header = () => (
    <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="text-blue-900 font-bold text-xl flex items-center">
          <span className="text-2xl mr-1 italic">Cogitate</span>
          <div className="h-6 w-px bg-gray-300 mx-2"></div>
          <span className="text-sm font-normal text-blue-700 leading-tight">DigitalEdge<br />Configuration Hub</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <div className="text-sm font-semibold text-blue-800">{USER_NAME}</div>
          <div className="text-xs text-gray-500 text-right">Cogitate User</div>
        </div>
        <div className="flex flex-col items-center cursor-pointer text-orange-500">
          <LogOut size={18} />
          <span className="text-[10px] uppercase font-bold">Logout</span>
        </div>
      </div>
    </div>
  );

  const Breadcrumb = ({ title }) => (
    <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center">
      <button
        onClick={goBack}
        className="mr-3 p-1 rounded-md border border-gray-300 bg-white text-blue-700 hover:bg-gray-100 transition-colors"
      >
        <ArrowLeft size={16} />
      </button>
      <div className="flex items-center text-xs font-semibold text-blue-900 uppercase tracking-tight">
        <Settings size={16} className="text-orange-500 mr-2" />
        {BREADCRUMB_BASE} {title}
      </div>
    </div>
  );

  const Tile = ({ icon: Icon, title, onClick, highlighted = false, subtitle = "" }) => (
    <div
      onClick={onClick}
      className={`relative group cursor-pointer bg-white border-2 rounded-lg p-6 flex flex-col items-start transition-all duration-200 hover:shadow-md h-36 w-full ${highlighted ? 'border-orange-500 ring-2 ring-orange-100' : 'border-blue-100 hover:border-blue-300'
        }`}
    >
      <div className="mb-4">
        <Icon size={36} className="text-orange-500" />
      </div>
      <div className="mt-auto">
        <h3 className={`text-sm font-bold ${highlighted ? 'text-orange-600' : 'text-gray-600'}`}>{title}</h3>
        {subtitle && <p className="text-[10px] text-gray-400 mt-1 uppercase">{subtitle}</p>}
      </div>
      {highlighted && (
        <div className="absolute top-2 right-2 flex space-x-1">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );

  // --- SCREEN: WORKFLOW RULES ---
  const WorkflowRules = () => {
    const rules = [
      { id: '84', desc: 'REFID3 - MCStatus is active and DOTStatus is inactive.', trans: 'Submission, Quote Indication, New Business, NEW, Renewable', type: 'uWRules-General', action: 'ReferToUW', status: 'Active', env: 'TEST', carrier: 'All Carriers', state: 'All States' },
      { id: '85', desc: 'REFID3 - MCStatus is active and DOTStatus is inactive.', trans: 'Endorsement', type: 'uWRules-General', action: 'ReferToUW', status: 'Active', env: 'TEST', carrier: 'All Carriers', state: 'All States' },
      { id: '86', desc: 'REFID4 - CAB Score >= 75', trans: 'Submission, Quote Indication, New Business, NEW, Renewable', type: 'uWRules-General', action: 'ReferToUW', status: 'Active', env: 'TEST', carrier: 'All Carriers', state: 'All States' },
      { id: '87', desc: 'REFID4 - CAB Score >= 75', trans: 'Endorsement', type: 'uWRules-General', action: 'ReferToUW', status: 'Active', env: 'TEST', carrier: 'All Carriers', state: 'All States' },
      { id: '88', desc: 'REFID5 - DOT Rating Unsatisfactory', trans: 'Submission, Quote Indication, New Business, NEW, Renewable', type: 'uWRules-General', action: 'ReferToUW', status: 'Active', env: 'TEST', carrier: 'All Carriers', state: 'All States' },
      { id: '89', desc: 'REFID5 - DOT Rating Unsatisfactory', trans: 'Endorsement', type: 'uWRules-General', action: 'ReferToUW', status: 'Active', env: 'TEST', carrier: 'All Carriers', state: 'All States' },
    ];

    if (workflowStep === 0) {
      return (
        <div className="p-12 flex flex-col items-center justify-center min-h-[500px]">
          <div className="bg-white p-10 rounded-2xl border border-blue-100 shadow-xl text-center max-w-md w-full">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Upload size={40} />
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">Upload Workflow BRD</h3>
            <p className="text-gray-500 text-sm mb-8">Upload your Excel Business Requirements Document to automatically generate workflow rules.</p>
            <button
              onClick={() => setWorkflowStep(1)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-100 transition-all flex items-center justify-center space-x-2"
            >
              <Upload size={18} />
              <span>Upload BRD</span>
            </button>
          </div>
        </div>
      );
    }

    if (workflowStep === 1) {
      return (
        <div className="p-12 flex flex-col items-center justify-center min-h-[500px] text-center">
          <div className="relative w-32 h-32 mb-8">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke="#f1f5f9" strokeWidth="8" fill="none" />
              <circle cx="50" cy="50" r="45" stroke="#2563eb" strokeWidth="8" fill="none" strokeDasharray={`${processingProgress * 2.83} 283`} strokeLinecap="round" className="transition-all duration-300" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-blue-600">{processingProgress}%</div>
          </div>
          <h3 className="text-2xl font-bold text-blue-900 mb-2">Analyzing BRD Logic</h3>
          <p className="text-gray-500 max-w-md">Extracting rule definitions, conditions, and transaction mappings from the business requirements document...</p>
        </div>
      );
    }

    if (workflowStep === 2) {
      return (
        <div className="p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
          <div className="flex flex-col space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <select className="border border-gray-300 rounded px-4 py-1.5 text-sm bg-white min-w-[200px] outline-none">
                  <option>Commercial - Auto</option>
                  <option>Personal - Homeowners</option>
                </select>
                <button className="bg-white border border-blue-600 text-blue-600 px-6 py-1.5 rounded text-sm font-bold hover:bg-blue-50">Review</button>
              </div>
              <button className="bg-white border border-blue-600 text-blue-600 px-4 py-1.5 rounded text-sm font-bold flex items-center space-x-2">
                <Download size={16} /> <span>Download All Rules</span>
              </button>
            </div>

            <div className="flex justify-between items-center">
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-300 rounded px-4 py-1.5 text-sm w-80 outline-none focus:ring-1 focus:ring-blue-500"
              />
              <div className="flex space-x-2">
                <button className="bg-blue-500 text-white px-6 py-1.5 rounded text-sm font-bold">Promote</button>
                <button className="bg-blue-600 text-white px-6 py-1.5 rounded text-sm font-bold">Add Rule</button>
                <button className="bg-blue-900 text-white px-6 py-1.5 rounded text-sm font-bold flex items-center space-x-2">
                  <Filter size={16} /> <span>Filter</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-blue-50 border-b border-gray-200 text-gray-800 font-bold">
                <tr>
                  <th className="px-4 py-4 w-10"><input type="checkbox" className="rounded" /></th>
                  <th className="px-4 py-4">Rule #</th>
                  <th className="px-4 py-4">Rule Description</th>
                  <th className="px-4 py-4">Transaction</th>
                  <th className="px-4 py-4">Type</th>
                  <th className="px-4 py-4">Action</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Environment</th>
                  <th className="px-4 py-4">Carrier</th>
                  <th className="px-4 py-4">State</th>
                  <th className="px-4 py-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rules.map((rule, idx) => (
                  <tr key={idx} className="hover:bg-orange-50/50 transition-colors group bg-orange-50/20">
                    <td className="px-4 py-4"><input type="checkbox" className="rounded border-gray-300" /></td>
                    <td className="px-4 py-4 text-gray-600 font-medium">[Rule {rule.id}]</td>
                    <td className="px-4 py-4 text-gray-800 font-medium max-w-xs">{rule.desc}</td>
                    <td className="px-4 py-4 text-gray-500">{rule.trans}</td>
                    <td className="px-4 py-4 text-gray-500">{rule.type}</td>
                    <td className="px-4 py-4 text-blue-600 font-bold">{rule.action}</td>
                    <td className="px-4 py-4 text-gray-600">{rule.status}</td>
                    <td className="px-4 py-4 text-gray-600 font-bold">{rule.env}</td>
                    <td className="px-4 py-4 text-gray-500">{rule.carrier}</td>
                    <td className="px-4 py-4 text-gray-500">{rule.state}</td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end space-x-4 text-blue-400">
                        <Copy size={16} className="cursor-pointer hover:text-blue-700" title="Duplicate" />
                        <Edit3
                          size={16}
                          className="cursor-pointer hover:text-blue-700 text-blue-600"
                          title="Edit"
                          onClick={() => {
                            setSelectedRule(rule);
                            setWorkflowStep(3);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (workflowStep === 3) {
      return (
        <div className="p-6 max-w-6xl mx-auto animate-in slide-in-from-right duration-300">
          <div className="bg-white rounded-lg border border-gray-200 shadow-xl overflow-hidden">
            <div className="bg-blue-50/50 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3 text-blue-900">
                <Edit3 size={18} className="text-blue-600" />
                <h3 className="font-bold">Edit Workflow Rules</h3>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => setWorkflowStep(2)} className="px-6 py-1.5 border border-red-300 text-red-500 text-sm font-bold rounded hover:bg-red-50">Close</button>
                <button className="px-6 py-1.5 bg-blue-700 text-white text-sm font-bold rounded hover:bg-blue-800">Save</button>
              </div>
            </div>

            <div className="border-b border-gray-200 flex px-6">
              <button className="px-4 py-3 text-blue-600 border-b-2 border-blue-600 text-sm font-bold">Details</button>
              <button className="px-4 py-3 text-gray-400 text-sm font-medium cursor-not-allowed group relative">
                Rule Logic
                <span className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-800 text-white text-[10px] p-2 rounded whitespace-nowrap">Logic cannot be changed from here</span>
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="flex items-center">
                <label className="w-32 text-xs font-bold text-gray-600">Name *</label>
                <input type="text" className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none bg-blue-50/30" defaultValue={selectedRule?.desc} />
              </div>
              <div className="flex items-center">
                <label className="w-32 text-xs font-bold text-gray-600">Message *</label>
                <input type="text" className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none bg-blue-50/30" defaultValue="This status is inactive." />
              </div>
              <div className="flex items-center">
                <label className="w-32 text-xs font-bold text-gray-600">Status</label>
                <input type="text" className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none bg-blue-50/30" defaultValue="Active" />
              </div>
              <div className="flex items-center">
                <label className="w-32 text-xs font-bold text-gray-600">IsForm</label>
                <input type="text" className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none bg-blue-50/30" defaultValue="No" />
              </div>

              <div className="flex items-start">
                <label className="w-32 text-xs font-bold text-gray-600 mt-2">Transactions</label>
                <div className="flex-1 grid grid-cols-5 gap-4">
                  {[
                    { label: 'Submission', checked: true },
                    { label: 'Quote Indication', checked: true },
                    { label: 'New Business', checked: true },
                    { label: 'NEW', checked: true },
                    { label: 'Renewable', checked: true },
                    { label: 'Endorsement', checked: false },
                    { label: 'Reinstatement', checked: false },
                    { label: 'Cancellation', checked: false }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked={item.checked} className="w-4 h-4 rounded text-blue-600" />
                      <span className="text-xs font-medium text-gray-700">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center">
                <label className="w-32 text-xs font-bold text-gray-600">Type *</label>
                <div className="flex-1 border border-gray-300 rounded px-4 py-1 text-sm bg-blue-50/30 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-bold border border-gray-200 flex items-center">General Rule <X size={12} className="ml-2 cursor-pointer" /></span>
                  </div>
                  <ChevronRight size={14} className="rotate-90 text-gray-400" />
                </div>
              </div>

              <div className="flex items-center">
                <label className="w-32 text-xs font-bold text-gray-600">Action</label>
                <input type="text" className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none bg-blue-50/30" defaultValue="ReferToUW" />
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  // --- MODULE: APPLICATION STUDIO ---
  const ApplicationStudioModule = () => (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-lg font-bold text-blue-900 mb-6 border-b pb-2">Application Studio Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Tile
          icon={Layout}
          title="UI Schema Generator"
          highlighted={true}
          subtitle="Design Tool"
          onClick={() => navigateTo('ui-schema-generator')}
        />
        <Tile icon={Monitor} title="Validation JSON Generator" subtitle="Visual Builder" />
        {/* <Tile icon={Cpu} title="Logic Engine" subtitle="Rules & Scripts" /> */}
      </div>
    </div>
  );

  // --- MODULE: UI SCHEMA GENERATOR ---
  const UiSchemaGeneratorModule = () => {
    const loadingSteps = [
      "Taking initial policy object reference...",
      "Getting dynamic forms reference...",
      "Creating UI schema in loading..."
    ];

    if (studioStep === 'idle') {
      return (
        <div className="p-12 flex flex-col items-center justify-center min-h-[500px]">
          <div className="bg-white p-10 rounded-2xl border border-blue-100 shadow-xl text-center max-w-md w-full">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileJson size={40} />
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">UI Schema Generator</h3>
            <p className="text-gray-500 text-sm mb-8">Upload your BRD Excel to automatically generate the UI schema and screen layouts.</p>
            <button
              onClick={() => setStudioStep('loading')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-100 transition-all flex items-center justify-center space-x-2"
            >
              <Upload size={18} />
              <span>Upload BRD (Excel)</span>
            </button>
          </div>
        </div>
      );
    }

    if (studioStep === 'loading') {
      return (
        <div className="p-12 flex flex-col items-center justify-center min-h-[500px] text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-8"></div>
          <div className="space-y-4">
            {loadingSteps.map((step, idx) => (
              <div key={idx} className={`flex items-center space-x-3 transition-opacity duration-500 ${loadingStep >= idx ? 'opacity-100' : 'opacity-20'}`}>
                {loadingStep > idx ? <CheckCircle size={18} className="text-green-500" /> : <Activity size={18} className="text-blue-600" />}
                <span className={`text-sm font-bold ${loadingStep === idx ? 'text-blue-900' : 'text-gray-400'}`}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="h-[calc(100vh-140px)] flex bg-white border-t border-gray-100">
        {/* Left Side: Rendering */}
        <div className="flex-1 border-r border-gray-200 bg-gray-50 flex flex-col">
          <div className="bg-white px-6 py-3 border-b border-gray-200 flex justify-between items-center">
            <span className="text-xs font-bold text-blue-900 uppercase">Live Preview Rendering</span>
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-[10px] font-bold text-gray-400 uppercase">Interactive</span>
            </div>
          </div>
          <div className="flex-1 p-8 overflow-auto">
            <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h4 className="font-bold text-lg text-gray-800">Dwelling Property Details</h4>
                <p className="text-xs text-gray-400">Policy Object: HO3_Root.Dwelling</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Construction Type</label>
                  <select className="w-full border border-gray-200 rounded p-2 text-xs bg-gray-50 outline-none"><option>Frame</option></select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Year Built</label>
                  <input type="text" className="w-full border border-gray-200 rounded p-2 text-xs bg-gray-50 outline-none" placeholder="YYYY" />
                </div>
                <div className="space-y-1 col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Square Footage</label>
                  <input type="text" className="w-full border border-gray-200 rounded p-2 text-xs bg-gray-50 outline-none" placeholder="Sq. Ft." />
                </div>
              </div>
              <button className="w-full py-2 bg-blue-600 text-white rounded font-bold text-xs">Save & Next</button>
            </div>
          </div>
        </div>

        {/* Right Side: JSON Schema */}
        <div className="w-[500px] flex flex-col bg-gray-900">
          <div className="bg-gray-800 px-6 py-3 border-b border-gray-700 flex justify-between items-center">
            <span className="text-xs font-bold text-gray-300 uppercase">Generated UI Schema (JSON)</span>
            <Copy size={14} className="text-gray-500 cursor-pointer hover:text-white" />
          </div>
          <div className="flex-1 p-6 font-mono text-[11px] text-green-400 overflow-auto custom-scrollbar">
            <pre>
              {`{
  "screenId": "HO3_DWELLING_01",
  "label": "Dwelling Details",
  "policyObjectRef": "HO3_Root.Dwelling",
  "elements": [
    {
      "type": "select",
      "id": "construction_type",
      "label": "Construction Type",
      "options": ["Frame", "Masonry", "Joisted"],
      "grid": "col-6"
    },
    {
      "type": "input",
      "dataType": "number",
      "id": "year_built",
      "label": "Year Built",
      "validation": { "min": 1800 },
      "grid": "col-6"
    },
    {
      "type": "input",
      "id": "sq_ft",
      "label": "Square Footage",
      "grid": "col-12"
    }
  ]
}`}
            </pre>
          </div>
        </div>
      </div>
    );
  };

  // --- MODULE: DYNAMIC WORKFLOW ---
  const DynamicWorkflowModule = () => {
    const workflows = [
      { name: 'New Business Submission Flow', trigger: 'Policy Created', status: 'Active', updated: '2 hours ago' },
      { name: 'Policy Servicing', trigger: 'Quote Approved', status: 'Draft', updated: 'Yesterday' },
      // { name: 'Underwriting Referral Logic', trigger: 'Rule Flagged', status: 'Testing', updated: '3 days ago' },
    ];

    const actions = [
      { id: 'esign', label: 'eSignature Request', icon: Edit3, category: 'Third-Party' },
      { id: 'payment', label: 'Payment Gateway', icon: Zap, category: 'Third-Party' },
      { id: 'hazard', label: 'Hazard Hub Data', icon: Database, category: 'Data Services' },
      { id: 'rater', label: 'Execute Rater', icon: Activity, category: 'Core Engine' },
      { id: 'uw', label: 'Run UW Rules', icon: ShieldCheck, category: 'Core Engine' },
      { id: 'status', label: 'Update Status', icon: Rocket, category: 'System' },
      { id: 'condition', label: 'Conditional Branch', icon: GitBranch, category: 'Logic' }
    ];

    if (isRunning) {
      return (
        <div className="p-12 flex flex-col items-center justify-center min-h-[600px] text-center">
          <div className="w-24 h-24 mb-8 relative">
            <div className="absolute inset-0 rounded-full border-4 border-blue-50 border-t-blue-600 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="text-blue-600 ml-1" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-blue-900 mb-2">Executing Engine Runtime</h3>
          <p className="text-gray-500 max-w-md mb-8">Validating deterministic paths and executing step-by-step orchestrations for {selectedLob}...</p>
          <div className="w-full max-w-lg bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${processingProgress}%` }}></div>
          </div>
        </div>
      );
    }

    if (dwSubPage === 'list') {
      return (
        <div className="p-8 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-blue-900">Dynamic Workflow</h2>
              <p className="text-sm text-gray-500">Design and manage low-code policy lifecycle flows.</p>
            </div>
            <button
              onClick={() => setDwSubPage('designer')}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-2.5 rounded-lg flex items-center space-x-2 shadow-lg shadow-blue-100 transition-all"
            >
              <PlusCircle size={18} />
              <span>Create New Workflow</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workflows.map((wf, idx) => (
              <div key={idx} className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-blue-300 transition-all group cursor-pointer shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Layers size={24} />
                  </div>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${wf.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {wf.status}
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{wf.name}</h3>
                <p className="text-xs text-gray-500 mb-4">Trigger: {wf.trigger}</p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <span className="text-[10px] text-gray-400">Updated {wf.updated}</span>
                  <div className="flex space-x-2">
                    <button onClick={() => setDwSubPage('designer')} className="p-1.5 hover:bg-gray-100 rounded text-blue-600"><Edit3 size={16} /></button>
                    <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400"><Copy size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (dwSubPage === 'designer') {
      return (
        <div className="h-[calc(100vh-140px)] flex flex-col bg-gray-50 overflow-hidden">
          {/* Toolbar */}
          <div className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center shadow-sm">
            <div className="flex items-center space-x-4">
              <input type="text" className="font-bold text-blue-900 outline-none text-lg border-b-2 border-transparent focus:border-blue-600 w-64" defaultValue="New Business Submission Flow" />
              <span className="bg-gray-100 px-2 py-1 rounded text-[10px] text-gray-500 font-bold uppercase">v1.2 Draft</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-4 py-1.5 border border-gray-300 rounded font-bold text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                <FileJson size={16} /> <span>View Artifact</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-1.5 bg-white border border-blue-600 rounded font-bold text-sm text-blue-600 hover:bg-blue-50 transition-colors">
                <Save size={16} /> <span>Save Flow</span>
              </button>
              <button
                onClick={() => setIsRunning(true)}
                className="flex items-center space-x-2 px-4 py-1.5 bg-blue-700 text-white rounded font-bold text-sm hover:bg-blue-800 transition-all shadow-md"
              >
                <Play size={16} fill="currentColor" /> <span>Test Run</span>
              </button>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Action Catalogue Sidebar */}
            <div className="w-72 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
              <div className="p-4 border-b border-gray-100">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
                  <input type="text" placeholder="Search actions..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border-none rounded text-xs outline-none" />
                </div>
              </div>

              {['Logic', 'Core Engine', 'Third-Party', 'System'].map(cat => (
                <div key={cat} className="p-4">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">{cat}</h4>
                  <div className="space-y-2">
                    {actions.filter(a => a.category === cat || (cat === 'Third-Party' && a.category === 'Data Services')).map(action => (
                      <div
                        key={action.id}
                        className="flex items-center space-x-3 p-2.5 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 cursor-move group transition-all"
                      >
                        <div className="p-2 bg-white border border-gray-100 rounded text-blue-600 group-hover:scale-110 transition-transform">
                          <action.icon size={16} />
                        </div>
                        <span className="text-xs font-semibold text-gray-700">{action.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Designer Canvas */}
            <div className="flex-1 relative bg-gray-50 overflow-auto p-12 pattern-grid">
              <div className="flex flex-col items-center space-y-12">
                {/* Trigger Node */}
                <div className="flex flex-col items-center">
                  <div className="bg-green-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-green-100 flex items-center space-x-2 border-2 border-green-700">
                    <Rocket size={18} /> <span>Trigger: Submission Created</span>
                  </div>
                  <div className="h-12 w-0.5 bg-blue-200"></div>
                </div>

                {/* Node 1 */}
                <div className="flex flex-col items-center group relative">
                  <div className="bg-white border-2 border-blue-600 p-4 rounded-xl shadow-md w-64 cursor-pointer hover:ring-4 hover:ring-blue-100 transition-all">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded">
                        <Database size={18} />
                      </div>
                      <span className="font-bold text-xs text-blue-900">Hazard Hub Data</span>
                    </div>
                    <p className="text-[10px] text-gray-500">Fetch risk data for property location.</p>
                  </div>
                  <div className="h-12 w-0.5 bg-blue-200"></div>
                </div>

                {/* Branch Logic Node */}
                <div className="flex flex-col items-center relative">
                  <div
                    onClick={() => setSelectedNode('logic')}
                    className={`w-40 h-40 bg-white border-2 rotate-45 flex items-center justify-center shadow-lg cursor-pointer transition-all hover:ring-4 hover:ring-blue-100 ${selectedNode === 'logic' ? 'border-blue-600 ring-4 ring-blue-50' : 'border-gray-200'}`}
                  >
                    <div className="-rotate-45 flex flex-col items-center text-center">
                      <GitBranch className="text-orange-500 mb-1" size={24} />
                      <span className="text-[10px] font-bold text-gray-800">Check UW Referral?</span>
                    </div>
                  </div>

                  {/* Conditional Arms */}
                  <div className="w-full flex justify-between absolute top-[160px]">
                    <div className="flex flex-col items-center -translate-x-1/2">
                      <div className="h-12 w-0.5 bg-blue-200"></div>
                      <div className="bg-white border border-gray-200 p-3 rounded-lg text-[10px] font-bold text-red-500 shadow-sm uppercase tracking-tighter">False / Reject</div>
                    </div>
                    <div className="flex flex-col items-center translate-x-1/2">
                      <div className="h-12 w-0.5 bg-blue-200"></div>
                      <div className="bg-white border border-gray-200 p-3 rounded-lg text-[10px] font-bold text-green-600 shadow-sm uppercase tracking-tighter">True / Approve</div>
                    </div>
                  </div>
                </div>

                {/* Empty State / Add New */}
                <div className="pt-20">
                  <div className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-300 hover:border-blue-400 hover:text-blue-400 cursor-pointer transition-colors bg-white">
                    <Plus size={24} />
                  </div>
                </div>
              </div>

              {/* Canvas Controls */}
              <div className="absolute bottom-6 left-6 flex bg-white border border-gray-200 rounded-lg p-1 shadow-md space-x-1">
                <button className="p-2 hover:bg-gray-100 rounded text-gray-600"><MousePointer2 size={16} /></button>
                <div className="w-px bg-gray-200 mx-1"></div>
                <button className="p-2 hover:bg-gray-100 rounded text-gray-600 text-xs font-bold px-3">100%</button>
              </div>
            </div>

            {/* Properties Sidebar */}
            <div className="w-80 bg-white border-l border-gray-200 flex flex-col overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-bold text-blue-900">Node Properties</h4>
                  <X size={18} className="text-gray-400 cursor-pointer" onClick={() => setSelectedNode(null)} />
                </div>

                {!selectedNode ? (
                  <div className="text-center py-20">
                    <div className="p-4 bg-gray-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <MousePointer2 className="text-gray-300" size={24} />
                    </div>
                    <p className="text-xs text-gray-400">Select a node on the canvas to configure its parameters.</p>
                  </div>
                ) : (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase block mb-2">Node Label</label>
                      <input type="text" className="w-full p-2 border border-gray-200 rounded text-xs outline-none focus:ring-1 focus:ring-blue-500" defaultValue="Check UW Referral?" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase block mb-2">Condition Logic</label>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200 font-mono text-[10px] text-blue-700">
                        {`if (context.uwScore > 75) { \n  return true; \n} else { \n  return false; \n}`}
                      </div>
                      <button className="mt-2 text-[10px] text-blue-600 font-bold flex items-center hover:underline"><Terminal size={12} className="mr-1" /> Open Script Editor</button>
                    </div>
                    <div className="pt-4 border-t border-gray-100">
                      <label className="text-[10px] font-bold text-gray-400 uppercase block mb-2">Variable Mapping</label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[10px] bg-blue-50 p-2 rounded">
                          <span className="text-blue-800 font-bold">uwScore</span>
                          <span className="text-gray-400">← Policy.Risk.Score</span>
                        </div>
                      </div>
                      <button className="mt-4 w-full py-2 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase hover:bg-blue-100">Add Input Mapping</button>
                    </div>
                    <div className="pt-6">
                      <button className="w-full py-2 bg-red-50 text-red-600 text-[10px] font-bold rounded uppercase hover:bg-red-100">Delete Node</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (dwSubPage === 'test') {
      return (
        <div className="p-8 max-w-6xl mx-auto h-[calc(100vh-140px)] flex flex-col overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-blue-900 flex items-center">
              <Play className="mr-2 text-green-600" size={20} fill="currentColor" /> Simulation Results
            </h2>
            <button onClick={() => setDwSubPage('designer')} className="bg-white border border-gray-300 px-6 py-1.5 rounded font-bold text-xs text-gray-600 hover:bg-gray-50">Return to Designer</button>
          </div>

          <div className="flex-1 flex space-x-6 overflow-hidden">
            {/* Logs */}
            <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex justify-between">
                <span className="text-xs font-bold text-gray-600">Runtime Execution Logs</span>
                <span className="text-[10px] font-bold text-green-600 uppercase">Process Complete</span>
              </div>
              <div className="flex-1 p-6 font-mono text-xs overflow-y-auto space-y-3">
                <div className="text-gray-400">[19:02:11] INITIALIZING: New Business Submission Flow...</div>
                <div className="text-blue-600 underline">[19:02:12] ACTION: Hazard Hub Data {'->'} CALLING API (hazard.cogitate.us)</div>
                <div className="text-green-600 font-bold">[19:02:13] SUCCESS: Received property score (88/100)</div>
                <div className="text-gray-400">[19:02:13] CONTEXT: Updating uwScore = 88</div>
                <div className="text-orange-600 font-bold">[19:02:13] DECISION: "Check UW Referral?" {'->'} Condition Met (True)</div>
                <div className="text-blue-600 underline">[19:02:14] ACTION: Run UW Rules {'->'} Invoking Drools Engine</div>
                <div className="text-green-600 font-bold">[19:02:15] SUCCESS: No critical alerts. Path approved.</div>
                <div className="text-gray-900 border-l-2 border-blue-600 pl-3 py-2 bg-blue-50/30">[19:02:15] FINAL OUTPUT: status = 'UW_APPROVED'</div>
              </div>
            </div>

            {/* Artifact Preview */}
            <div className="w-96 bg-gray-900 rounded-xl p-6 overflow-hidden flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-gray-400">Workflow JSON (Artifact)</span>
                <Copy size={14} className="text-gray-500 cursor-pointer hover:text-white" />
              </div>
              <pre className="flex-1 text-[10px] text-green-400 font-mono overflow-auto custom-scrollbar">
                {JSON.stringify({
                  id: "wf_9022",
                  name: "NB_Submission",
                  trigger: "ON_POLICY_CREATE",
                  steps: [
                    { id: "s1", type: "API_CALL", target: "HazardHub", mapping: { score: "uwScore" } },
                    { id: "s2", type: "CONDITION", expression: "uwScore > 75", paths: { true: "s3", false: "exit" } },
                    { id: "s3", type: "ENGINE_CALL", target: "DROOLS_UW" }
                  ]
                }, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      );
    }
  };

  // --- SCREEN: CONFIGURATOR MENU ---
  const ConfiguratorMenu = () => (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <label className="text-xs font-bold text-gray-600 block mb-2">Select LOB * :</label>
        <div className="flex items-center space-x-2">
          <select
            className="border border-gray-300 rounded px-3 py-1.5 text-sm w-64 outline-none focus:ring-1 focus:ring-blue-500"
            value={selectedLob}
            onChange={(e) => setSelectedLob(e.target.value)}
          >
            <option>Personal Homeowners</option>
            <option>Commercial Property</option>
            <option>General Liability</option>
          </select>
          <ExternalLink size={18} className="text-blue-600 cursor-pointer" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Tile icon={Layers} title="AccountHub" />
        <Tile icon={FileText} title="Quote" />
        <Tile icon={Activity} title="Submissions" />
        <Tile icon={CheckCircle} title="Endorsement" />
        <Tile icon={Layers} title="Summary" />
        <Tile icon={Box} title="Policy Servicing" />
        <Tile icon={FileText} title="Form Factory" highlighted={true} onClick={() => navigateTo('form-factory')} />
        <Tile icon={Settings} title="Integration Hub" highlighted={true} onClick={() => navigateTo('integration-hub')} />
        <Tile icon={ListChecks} title="Workflow Rules" highlighted={true} onClick={() => navigateTo('workflow-rules')} />
        <Tile icon={GitBranch} title="Dynamic Workflow" highlighted={true} onClick={() => navigateTo('dynamic-workflow')} />
        <Tile icon={Layout} title="Application Studio" highlighted={true} onClick={() => navigateTo('application-studio')} />
      </div>
    </div>
  );

  // --- SCREEN: FORM FACTORY ---
  const FormFactory = () => {
    const formData = [
      { name: 'AKIB TEST', code: 'BASELAB-30633463', desc: 'test form', type: 'Static', lob: 'HO3,FLD', ver: 1, by: 'schaudhari', date: '10/09/2025' },
      { name: 'atharva test', code: 'BASELAB-26051037', desc: 'test form', type: 'Static', lob: 'HO3', ver: 2, by: 'schaudhari', date: '10/09/2025' },
      { name: 'base', code: 'base', desc: 'base', type: 'DynamicDocx', lob: 'AL,GL', ver: 4, by: 'rnarnaware', date: '25/06/2025' },
      { name: 'base', code: 'base', desc: 'base', type: 'DynamicDocx', lob: 'AL,GL', ver: 3, by: 'rnarnaware', date: '25/06/2025' },
      { name: 'BASE', code: 'base', desc: 'base', type: 'DynamicDocx', lob: 'HO3,FLD,M', ver: 3, by: 'rnarnaware', date: '27/05/2025' },
    ];

    return (
      <div className="p-6 max-w-[1600px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-500 rounded text-white">
              <FileText size={20} />
            </div>
            <h2 className="text-lg font-bold text-blue-900">Form Factory</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateTo('form-ai-wizard')}
              className="flex items-center space-x-2 bg-blue-700 text-white px-4 py-2 rounded text-sm font-bold shadow-sm hover:bg-blue-800 transition-all"
            >
              <Brain size={16} />
              <span>Create with Form AI</span>
            </button>
            <button className="flex items-center space-x-2 bg-blue-700 text-white px-4 py-2 rounded text-sm font-bold shadow-sm hover:bg-blue-800 transition-all">
              <span>Promote Forms</span>
            </button>
            <button className="flex items-center space-x-2 bg-blue-700 text-white px-4 py-2 rounded text-sm font-bold shadow-sm hover:bg-blue-800 transition-all">
              <span>Add Form</span>
            </button>
            <button className="flex items-center space-x-2 bg-blue-900 text-white px-4 py-2 rounded text-sm font-bold shadow-sm hover:bg-gray-800 transition-all">
              <Filter size={16} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-blue-50 border-b border-gray-200 text-blue-900 uppercase font-bold">
              <tr>
                <th className="px-4 py-3">Form Name</th>
                <th className="px-4 py-3">Form Code</th>
                <th className="px-4 py-3">Form Description</th>
                <th className="px-4 py-3">Form Type</th>
                <th className="px-4 py-3">Lob</th>
                <th className="px-4 py-3">Version</th>
                <th className="px-4 py-3">Created By</th>
                <th className="px-4 py-3">Created Date</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {formData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-700">{row.name}</td>
                  <td className="px-4 py-3 text-gray-500">{row.code}</td>
                  <td className="px-4 py-3 text-gray-500">{row.desc}</td>
                  <td className="px-4 py-3 text-gray-500">{row.type}</td>
                  <td className="px-4 py-3">
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">{row.lob}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{row.ver}</td>
                  <td className="px-4 py-3 text-gray-500">{row.by}</td>
                  <td className="px-4 py-3 text-gray-500">{row.date}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end space-x-3 text-blue-600">
                      <BarChart2 size={16} className="cursor-pointer hover:text-blue-800" />
                      <Edit3 size={16} className="cursor-pointer hover:text-blue-800" />
                      <Eye size={16} className="cursor-pointer hover:text-blue-800" />
                      <Download size={16} className="cursor-pointer hover:text-blue-800" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200">
            <span className="text-gray-500">Showing 1 to 5 of 24 entries</span>
            <div className="flex space-x-1">
              {[1, 2, 3].map(n => (
                <button key={n} className={`px-3 py-1 rounded border ${n === 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border-gray-300'}`}>{n}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- SCREEN: FORM AI WIZARD ---
  const FormAiWizard = () => {
    const steps = [
      { label: "Upload Sample", icon: Upload },
      { label: "Generate Mnemonics", icon: Activity },
      { label: "Review BRD", icon: FileText },
      { label: "Generate Mapping", icon: Layers },
      { label: "Layout QA", icon: ShieldCheck },
      { label: "Upload to Form Factory", icon: Rocket }
    ];

    const renderStepContent = () => {
      switch (formAiStep) {
        case 0: // Upload
          return (
            <div className="space-y-6">
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded text-sm text-orange-700">
                <span className="font-bold block mb-1">⚠️ Important: Golden Sample Requirements</span>
                Please upload a perfectly formatted DOCX with all fields filled with sample data. Any layout issues in the input will be replicated in the output.
              </div>
              <div className="border-2 border-dashed border-blue-200 rounded-xl p-12 bg-blue-50/30 text-center hover:bg-blue-50 transition-colors cursor-pointer group">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FileText size={32} />
                </div>
                <h4 className="font-bold text-blue-900 text-lg">Upload Filled Sample Form</h4>
                <p className="text-gray-500 text-sm mt-1">Drag and drop your .docx file here, or click to browse</p>
                <button className="mt-6 px-6 py-2 bg-blue-700 text-white font-bold rounded shadow-sm">Browse Files</button>
              </div>
            </div>
          );
        case 1: // Mnemonic Generation
        case 3: // Mapping Generation
          return (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
                <div
                  className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"
                  style={{ animationDuration: '1.5s' }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center text-blue-600 font-bold">
                  {processingProgress}%
                </div>
              </div>
              <h4 className="font-bold text-xl text-blue-900 mb-2">
                {formAiStep === 1 ? "AI Engine Processing..." : "Generating Transformation Logic..."}
              </h4>
              <p className="text-gray-500 text-sm max-w-md">
                {formAiStep === 1
                  ? "Analyzing document structure and identifying dynamic fields to replace with unique mnemonic tags."
                  : "Reading the validated BRD to generate JavaScript transformation files and docxtemplater syntax."}
              </p>

              <div className="w-full max-w-lg mt-10 space-y-4 text-left">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-700">Document Uploaded</span>
                  <span className="text-green-600 font-bold uppercase">Complete</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${processingProgress}%` }}></div>
                </div>
                <p className="text-[10px] text-gray-400 font-mono italic">
                  {processingProgress < 40 ? "> Loading file buffer..." : processingProgress < 70 ? "> Running regex pattern matching..." : "> Finalizing JSON output..."}
                </p>
              </div>
            </div>
          );
        case 2: // Review BRD
          return (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="p-5 border border-gray-200 rounded-lg bg-white flex items-center justify-between hover:border-blue-300 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded">
                      <FileText size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-800">Sample_Dwelling_Mnemonic.docx</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider">Form with mnemonic tags</div>
                    </div>
                  </div>
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Download size={20} /></button>
                </div>
                <div className="p-5 border border-gray-200 rounded-lg bg-white flex items-center justify-between hover:border-blue-300 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-green-50 text-green-600 rounded">
                      <BarChart2 size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-800">Sample_Dwelling_BRD.xlsx</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider">Business Requirements Document</div>
                    </div>
                  </div>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded"><Download size={20} /></button>
                </div>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h5 className="font-bold text-blue-900 text-sm mb-4 border-b border-blue-200 pb-2">📋 Review Checklist for CS Team</h5>
                <ul className="text-sm space-y-3 text-blue-800/80">
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Verify all dynamic fields (e.g., &lt;INSURED_NAME&gt;) are correctly identified in the Mnemonic DOCX.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Review the BRD Excel for field metadata accuracy and business logic mapping.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Add table boundary markers manually if any repeating sections were missed.</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <button className="w-full bg-blue-700 text-white font-bold py-2 rounded text-sm hover:bg-blue-800">✓ Upload Validated Files</button>
                </div>
              </div>
            </div>
          );
        case 4: // Layout QA
          return (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-bold text-gray-800">Final Template Refinement</h5>
                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-bold uppercase">Developer QA Phase</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-100 p-4 rounded flex items-center justify-between border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <FileText className="text-blue-600" size={18} />
                    <span className="text-xs font-bold text-gray-700">Sample_Dwelling_mapped_DRAFT.docx</span>
                  </div>
                  <Download size={14} className="text-gray-400 cursor-pointer" />
                </div>
                <div className="bg-gray-100 p-4 rounded flex items-center justify-between border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <Code className="text-orange-600" size={18} />
                    <span className="text-xs font-bold text-gray-700">Sample_Dwelling_transformation.js</span>
                  </div>
                  <Download size={14} className="text-gray-400 cursor-pointer" />
                </div>
              </div>
              <div className="border-2 border-dashed border-green-200 bg-green-50/20 p-8 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-4">Upload the QA-approved, finalized mapped DOCX after verifying tag placements and table layouts in Word.</p>
                <button className="bg-white border border-green-600 text-green-700 px-6 py-2 rounded font-bold text-xs hover:bg-green-50">Upload Final Template</button>
              </div>
            </div>
          );
        case 5: // Deploy
          return (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
                <div className="flex items-center space-x-4 border-b border-gray-100 pb-4">
                  <div className="p-3 bg-green-100 text-green-600 rounded-full">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-blue-900">Deployment Package Ready</h5>
                    <p className="text-xs text-gray-500">Everything verified and approved for LCNC production environment.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-sm p-3 bg-gray-50 rounded">
                    <span className="text-xs text-gray-500 block mb-1 uppercase font-bold tracking-wider">Form Name</span>
                    <span className="font-bold text-blue-800">Sample Dwelling Declaration</span>
                  </div>
                  <div className="text-sm p-3 bg-gray-50 rounded">
                    <span className="text-xs text-gray-500 block mb-1 uppercase font-bold tracking-wider">Form Code</span>
                    <span className="font-bold text-blue-800">Sample-96659402</span>
                  </div>
                </div>

                <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center justify-between mb-4">
                    <h6 className="text-xs font-bold text-blue-900 uppercase">🧪 System Test</h6>
                    <button className="text-[10px] bg-white text-blue-600 px-2 py-1 rounded border border-blue-200 font-bold">Upload JSON Data</button>
                  </div>
                  <button className="w-full bg-blue-100 text-blue-700 font-bold py-2 rounded text-xs hover:bg-blue-200 transition-colors">
                    Generate Preview PDF
                  </button>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 py-3 bg-gray-100 text-gray-600 font-bold rounded-lg hover:bg-gray-200 text-sm">Save as Draft</button>
                  <button className="flex-[2] py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 text-sm shadow-md">🚀 Upload</button>
                </div>
              </div>
            </div>
          );
        default: return null;
      }
    };

    return (
      <div className="p-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 border-b border-gray-200 px-8 py-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-600 rounded text-white shadow-lg shadow-green-100">
                <Brain size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900">Forms Generation</h3>
                <p className="text-xs text-gray-500">Intelligent form generation using AI</p>
              </div>
            </div>
          </div>

          {/* Stepper */}
          <div className="px-8 py-8 border-b border-gray-100 bg-white">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 -translate-y-1/2 -z-0"></div>
              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center relative z-10 w-24">
                  <div
                    onClick={() => idx <= formAiStep && setFormAiStep(idx)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer border-2 ${idx === formAiStep
                      ? 'bg-blue-600 text-white border-blue-700 shadow-lg scale-110'
                      : idx < formAiStep
                        ? 'bg-green-500 text-white border-green-600'
                        : 'bg-white text-gray-300 border-gray-100 hover:border-blue-200'
                      }`}
                  >
                    {idx < formAiStep ? <CheckCircle size={18} /> : React.createElement(step.icon, { size: 18 })}
                  </div>
                  <span className={`mt-3 text-[10px] font-bold uppercase tracking-tight text-center ${idx === formAiStep ? 'text-blue-600' : 'text-gray-400'}`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="px-12 py-10 min-h-[450px]">
            {renderStepContent()}
          </div>

          {/* Footer Navigation */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 flex justify-between">
            <button
              disabled={formAiStep === 0}
              onClick={() => setFormAiStep(s => Math.max(0, s - 1))}
              className={`px-6 py-2 border rounded font-bold text-xs transition-colors ${formAiStep === 0 ? 'border-gray-200 text-gray-300' : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
            >
              Back
            </button>
            <button
              disabled={formAiStep === 1 || formAiStep === 3 ? processingProgress < 100 : false}
              onClick={() => formAiStep < steps.length - 1 ? setFormAiStep(s => s + 1) : navigateTo('form-factory')}
              className={`px-8 py-2 rounded font-bold text-xs shadow-sm transition-all ${(formAiStep === 1 || formAiStep === 3) && processingProgress < 100
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-700 text-white hover:bg-blue-800'
                }`}
            >
              {formAiStep === steps.length - 1 ? 'Finish' : 'Continue →'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // --- SCREEN: DATA SERVICE (IRIS) ---
  const DataService = () => {
    const apis = [
      { id: 1, name: 'Personal Auto Prefill', status: 'Deployed', type: 'Existing' },
      { id: 2, name: 'Homeowners Risk Score', status: 'Testing', type: 'New' },
      { id: 3, name: 'Address Validation', status: 'Active', type: 'Existing' }
    ];

    return (
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h3 className="font-bold text-blue-900">IRIS - Data Service Configuration</h3>
            <div className="flex space-x-2">
              <button className="px-4 py-1.5 bg-white border border-gray-300 text-sm font-medium rounded hover:bg-gray-50 flex items-center space-x-2 text-gray-700">
                <Plus size={16} /> <span>Existing API</span>
              </button>
              <button
                onClick={() => navigateTo('iris-details')}
                className="px-4 py-1.5 bg-orange-500 border border-orange-600 text-sm font-bold rounded hover:bg-orange-600 flex items-center space-x-2 text-white shadow-sm"
              >
                <Plus size={16} /> <span>Add New API</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-bold text-gray-500">LOB Selection:</span>
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">
                  {selectedLob}
                </span>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Filter Existing APIs..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm outline-none w-64"
                />
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 font-bold text-gray-600">API Name</th>
                    <th className="px-6 py-3 font-bold text-gray-600">Type</th>
                    <th className="px-6 py-3 font-bold text-gray-600">Status</th>
                    <th className="px-6 py-3 font-bold text-gray-600 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {apis.map((api) => (
                    <tr key={api.id} className="hover:bg-blue-50 transition-colors cursor-pointer group" onClick={() => navigateTo('iris-details')}>
                      <td className="px-6 py-4 font-medium text-blue-800">{api.name}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${api.type === 'New' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                          {api.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${api.status === 'Deployed' ? 'bg-green-500' : 'bg-orange-400'}`}></div>
                          <span className="text-xs text-gray-600">{api.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-500 inline" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- SCREEN: IRIS DETAILS ---
  const IrisDetails = () => {
    const steps = [
      { id: 'processing', label: 'Processing', icon: Activity },
      { id: 'validation', label: 'Validation', icon: ShieldCheck },
      { id: 'deploy', label: 'Deploy', icon: Rocket },
      { id: 'test', label: 'Test', icon: Play }
    ];

    const StepIcon = steps[activeStep].icon;

    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h3 className="font-bold text-blue-900">IRIS Screen: API Lifecycle Management</h3>
            <div className="flex items-center text-xs text-gray-500 font-bold uppercase tracking-wider space-x-4">
              <span className="flex items-center"><CheckCircle size={14} className="text-green-500 mr-1" /> Configured</span>
              <span className="flex items-center text-orange-500"><Activity size={14} className="mr-1" /> In Progress</span>
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-center mb-12">
              {steps.map((step, idx) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center relative">
                    <div
                      onClick={() => setActiveStep(idx)}
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${activeStep === idx
                        ? 'bg-orange-500 border-orange-600 text-white scale-110 shadow-lg ring-4 ring-orange-100'
                        : activeStep > idx
                          ? 'bg-green-500 border-green-600 text-white'
                          : 'bg-white border-gray-300 text-gray-400'
                        }`}
                    >
                      {React.createElement(step.icon, { size: 20 })}
                    </div>
                    <span className={`mt-3 text-xs font-bold uppercase tracking-tight ${activeStep === idx ? 'text-orange-600' : 'text-gray-500'}`}>
                      {step.label}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`h-0.5 w-24 mx-2 ${activeStep > idx ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 min-h-[400px]">
              {activeStep === 0 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-700 flex items-center">
                      <Code className="mr-2 text-blue-600" size={18} /> Add New API - Data Configuration
                    </h4>
                    <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold uppercase">Option: New API</span>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-gray-500 block mb-1">CURL Command</label>
                        <textarea
                          placeholder="curl -X POST https://api.carrier.com/v1/..."
                          className="w-full h-32 p-3 border border-gray-300 rounded bg-white font-mono text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 block mb-1">Documentation (Doc)</label>
                        <input type="text" placeholder="https://docs.carrier.com/api" className="w-full p-2 border border-gray-300 rounded text-sm bg-white" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-gray-500 block mb-1">Policy-Object Reference</label>
                        <select className="w-full p-2 border border-gray-300 rounded text-sm bg-white outline-none">
                          <option>Select Policy Object...</option>
                          <option>PersonalHomeowners_Root</option>
                          <option>Dwelling_Structure</option>
                        </select>
                      </div>
                      <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-blue-700">Policy-Schema (Auto-fetch)</span>
                          <span className="text-[10px] text-green-600 font-bold uppercase">Active</span>
                        </div>
                        <div className="text-[10px] text-gray-500 bg-white p-3 border border-blue-100 rounded h-20 overflow-auto font-mono whitespace-pre">
                          {`{ \n  "schema": "http://json-schema.org/draft-07/schema#",\n  "type": "object", \n  "properties": { \n    "limit": { "type": "number" }, \n    "deductible": { "type": "integer" } \n  } \n}`}
                        </div>
                        <button className="mt-3 w-full py-1.5 bg-blue-600 text-white text-[10px] font-bold rounded uppercase hover:bg-blue-700 transition-colors">
                          Refetch Schema
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeStep > 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                    <StepIcon size={32} />
                  </div>
                  <h4 className="font-bold text-xl text-gray-700 mb-2">{steps[activeStep].label} Phase</h4>
                  <p className="text-gray-500 text-sm max-w-md">
                    The IRIS system is performing {steps[activeStep].label.toLowerCase()} on your API configuration.
                    This ensures the integration is seamless with the {selectedLob} business logic.
                  </p>
                  <button className="mt-6 px-6 py-2 bg-orange-500 text-white font-bold rounded-lg shadow-sm">
                    Move to Next Stage
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-between">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep(s => Math.max(0, s - 1))}
                className={`px-6 py-2 border border-gray-300 rounded font-bold text-sm ${activeStep === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                Back
              </button>
              <button
                onClick={() => activeStep === 3 ? navigateTo('data-service') : setActiveStep(s => Math.min(3, s + 1))}
                className="px-8 py-2 bg-blue-700 text-white rounded font-bold text-sm hover:bg-blue-800 transition-colors"
              >
                {activeStep === 3 ? 'Complete Integration' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- INTEGRATION HUB MODULES ---
  const IntegrationHub = () => (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-lg font-bold text-blue-900 mb-6 border-b pb-2">Integration Hub Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Tile
          icon={Database}
          title="Data Service"
          highlighted={true}
          subtitle="Active Module"
          onClick={() => navigateTo('data-service')}
        />
        <Tile icon={Layers} title="Internal Systems" subtitle="DEP, DEC, DDM" />
        <Tile icon={Globe} title="External Systems" subtitle="AIM, IR, IVANS" />
        <Tile icon={Zap} title="Workflows" subtitle="Payment Gateway, eSign" />
        <Tile icon={Truck} title="Carriers" subtitle="Carrier Integrations" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-orange-100">
      <Header />

      {currentPage === 'configurator' && (
        <>
          <Breadcrumb title="Configurator Menu" />
          <ConfiguratorMenu />
        </>
      )}

      {currentPage === 'form-factory' && (
        <>
          <Breadcrumb title="Form Factory" />
          <FormFactory />
        </>
      )}

      {currentPage === 'form-ai-wizard' && (
        <>
          <Breadcrumb title="Form Factory | Form AI Integration" />
          <FormAiWizard />
        </>
      )}

      {currentPage === 'integration-hub' && (
        <>
          <Breadcrumb title="Integration Hub" />
          <IntegrationHub />
        </>
      )}

      {currentPage === 'data-service' && (
        <>
          <Breadcrumb title="Integration Hub | Data Service" />
          <DataService />
        </>
      )}

      {currentPage === 'iris-details' && (
        <>
          <Breadcrumb title="Integration Hub | Data Service | IRIS" />
          <IrisDetails />
        </>
      )}

      {currentPage === 'workflow-rules' && (
        <>
          <Breadcrumb title={`Workflow Rules${workflowStep === 3 ? ' | Edit Rule' : ''}`} />
          <WorkflowRules />
        </>
      )}

      {currentPage === 'dynamic-workflow' && (
        <>
          <Breadcrumb title={`Dynamic Workflow${dwSubPage === 'designer' ? ' | Designer' : dwSubPage === 'test' ? ' | Sandbox' : ''}`} />
          <DynamicWorkflowModule />
        </>
      )}

      {currentPage === 'application-studio' && (
        <>
          <Breadcrumb title="Application Studio" />
          <ApplicationStudioModule />
        </>
      )}

      {currentPage === 'ui-schema-generator' && (
        <>
          <Breadcrumb title={`Application Studio | UI Schema Generator${studioStep === 'result' ? ' | Schema' : ''}`} />
          <UiSchemaGeneratorModule />
        </>
      )}

      {/* Background Graphic Pattern */}
      <div className="fixed bottom-0 left-0 -z-10 opacity-10 pointer-events-none">
        <svg width="800" height="400" viewBox="0 0 800 400" fill="none">
          <path d="M0 400C100 350 200 380 300 320C400 260 500 200 600 250C700 300 800 200 800 200" stroke="#3B82F6" strokeWidth="2" />
          <path d="M0 350C120 320 250 340 350 280C450 220 550 150 650 200C750 250 800 150 800 150" stroke="#3B82F6" strokeWidth="1" />
        </svg>
      </div>

      <footer className="fixed bottom-0 w-full bg-white border-t border-gray-100 py-1 px-4 text-[10px] text-gray-400 text-center">
        Powered by Cogitate Technology Solutions | Copyright 2026, all rights reserved
      </footer>
    </div>
  );
};

export default App;
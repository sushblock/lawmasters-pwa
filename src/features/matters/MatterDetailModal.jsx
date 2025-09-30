import { Modal, Button } from '../../components/common';

export default function MatterDetailModal({ matter, isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={matter?.title || ''}>
      {matter && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Case Information</h3>
              <div className="space-y-2 text-sm">
                <div><span className="text-gray-500">Case No:</span> <span className="font-medium">{matter.caseNo}</span></div>
                <div><span className="text-gray-500">Court:</span> <span className="font-medium">{matter.court}</span></div>
                <div><span className="text-gray-500">Judge:</span> <span className="font-medium">{matter.judge}</span></div>
                <div><span className="text-gray-500">Filing Date:</span> <span className="font-medium">{matter.filingDate}</span></div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Client Information</h3>
              <div className="space-y-2 text-sm">
                <div><span className="text-gray-500">Client:</span> <span className="font-medium">{matter.client}</span></div>
                <div><span className="text-gray-500">Next Hearing:</span> <span className="font-medium">{matter.nextHearing}</span></div>
                <div><span className="text-gray-500">Stage:</span> <span className="font-medium">{matter.stage}</span></div>
                <div><span className="text-gray-500">Priority:</span>
                  <span className={`ml-1 px-2 py-1 text-xs font-semibold rounded-full ${
                    matter.priority==='High'?'bg-red-100 text-red-800':matter.priority==='Medium'?'bg-yellow-100 text-yellow-800':'bg-green-100 text-green-800'
                  }`}>{matter.priority}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{matter.description}</p>
          </div>
          <div className="mt-8 flex justify-end space-x-3">
            <Button variant="secondary">Edit Matter</Button>
            <Button variant="primary">Add Hearing</Button>
          </div>
        </>
      )}
    </Modal>
  );
}


class HistoryModel  {
    constructor(body) {
        if(body){
            this.field=body.field
            this.note=body.note
            this.oldValue=body.oldValue
            this.newValue=body.newValue
            this.createdDate=body.createdDate
            this.user=body.user
            this.syllabus=body.syllabus
            this.prevHistory=body.prevHistory
            this.approved=body.approved
            this.approveDate=body.approveDate
            this.headMasterSignature=body.headMasterSignature
            this.instructorSignature=body.instructorSignature
        }
    }
    modelize(history){
        this._id=history._id
        this.field=history.field
        this.note=history.note
        this.oldValue=history.oldValue
        this.newValue=history.newValue
        this.createdDate=history.createdDate
        this.user=history.user
        this.syllabus=history.syllabus
        this.prevHistory=history.prevHistory
        this.approved=history.approved
        this.approveDate=history.approveDate
        this.headMasterSignature=history.headMasterSignature
        this.instructorSignature=history.instructorSignature

    }
  }
  
  module.exports = HistoryModel;
  
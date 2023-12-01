export class SyllabusModel {
    static from(json) {
        return Object.assign(new SyllabusModel(), json);
    }
    constructor(_id, course, courseOutcomes, courseSchedules, courseAssessments) {
        this._id = _id;
        this.course = course;
        this.courseOutcomes = courseOutcomes;
        this.courseSchedules = courseSchedules;
        this.courseAssessments = courseAssessments;
    }
}
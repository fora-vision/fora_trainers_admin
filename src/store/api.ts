import { CourseDTO, ExerciseRuleDTO, WorkoutDTO } from "./models";

class ForaApi {
  private session: string = "";
  private endpoint = "https://dev.fora.vision";

  public setAuthToken(session: string) {
    this.session = session;
  }

  private async fetch<T = any>(
    input: RequestInfo,
    init: RequestInit = {}
  ): Promise<T> {
    const auth = { Authorization: this.session };
    const res = await fetch(`${this.endpoint}/${input}`, {
      ...init,
      headers: Object.assign(auth, init.headers),
    });

    if (!res.ok) {
      throw Error(res.statusText);
    }

    return await res.json();
  }

  async createCourse(name: string, description: string): Promise<CourseDTO> {
    return await this.fetch("api/v2/console/course", {
      method: "POST",
      body: JSON.stringify({ description, name }),
    });
  }

  async testWorkout(course: number, workout: number): Promise<string> {
    const { url } = await this.fetch(
      `api/v2/console/course/${course}/${workout}/example_workout`
    );
    return url;
  }

  async updateCourse(id: number, course: any) {
    await this.fetch(`api/v2/console/course/${id}`, {
      method: "PUT",
      body: JSON.stringify(course),
    });
  }

  async deleteCourse(id: number) {
    await this.fetch(`api/v2/console/course/${id}`, {
      method: "DELETE",
    });
  }

  async getExercises(): Promise<Record<string, ExerciseRuleDTO>> {
    const { exercises } = await this.fetch("api/v1/workout/exercises");
    return exercises;
  }

  async getCourses(): Promise<CourseDTO[]> {
    const { courses } = await this.fetch("api/v2/console/course");
    return courses;
  }

  async login(login: string, password: string) {
    return await this.fetch("api/v2/console/admin", {
      method: "POST",
      body: JSON.stringify({ login, password }),
    });
  }
}

export default new ForaApi();

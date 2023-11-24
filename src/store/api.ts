import { AccountData, AccountSettings, CourseDTO, ExerciseRuleDTO, UserDTO } from "./models";

class ForaApi {
  private session: string = "";
  private endpoint = "https://dev.fora.vision";

  public setAuthToken(session: string) {
    this.session = session;
  }

  private async fetch<T = any>(input: RequestInfo, init: RequestInit = {}): Promise<T> {
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
    const { url } = await this.fetch(`api/v2/console/course/${course}/${workout}/example_workout`);
    return url;
  }

  async publicateCourse(id: number, deadline: number, save_photos: boolean): Promise<string> {
    const { invite_code } = await this.fetch(`api/v2/console/course/${id}/publish`, {
      method: "POST",
      body: JSON.stringify({ deadline, save_photos }),
    });

    return invite_code;
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

  async deleteUser(course: number, user: number) {
    await this.fetch(`api/v2/console/course/${course}/user/${user}`, {
      method: "DELETE",
    });
  }

  async getUsersXlsx(course: number) {
    const res = await fetch(`${this.endpoint}/api/v2/console/${course}/users.xlsx`, {
      headers: { Authorization: this.session },
    });

    if (!res.ok) {
      throw Error(res.statusText);
    }

    return await res.blob();
  }

  async getExercises(): Promise<Record<string, ExerciseRuleDTO>> {
    const { exercises } = await this.fetch("api/v1/workout/exercises");
    return exercises;
  }

  async getCourses(): Promise<CourseDTO[]> {
    const { courses } = await this.fetch("api/v2/console/course");
    return courses;
  }

  async getUsers(id: number): Promise<UserDTO[]> {
    const { users } = await this.fetch(`api/v2/console/users?course_id=${id}`);
    return users;
  }

  async getUser(): Promise<AccountData> {
    return await this.fetch(`api/v2/console/admin`);
  }

  async createAccount(settings: AccountSettings): Promise<string> {
    const { session } = await this.fetch("api/v2/console/account", {
      body: JSON.stringify(settings),
      method: "POST",
    });

    return session;
  }

  async login(login: string, password: string) {
    return await this.fetch("api/v2/console/admin", {
      method: "POST",
      body: JSON.stringify({ login, password }),
    });
  }
}

export default new ForaApi();

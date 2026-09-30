
function Courses() {

  const courses = ["MERN", "Python", "Java", "UI/UX", "Data Science"];

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-4">
        Available Courses
      </h2>

      <div className="flex gap-4">
        {courses.map((e,i) => (
          <div
            key={i}
            className="border rounded-lg p-4 shadow-md"
          >
            <h3 className="text-lg font-semibold">
              {e}
            </h3>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Courses;
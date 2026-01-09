import Container from "../layout/Container";
import Card from "../ui/Card";
import { SKILLS_DATA } from "@/constants/skills";

/**
 * Skills Section
 * Displays developer skills organized in cards
 */
export default function Skills() {
  return (
    <section id="skills" aria-label="Skills section">
        <br />
        <br />
      <Container>
        <div className="border border-gray-200 rounded-2xl p-2 dark:border-gray-700 dark:bg-[rgb(var(--bg-card))]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {SKILLS_DATA.map((skill) => (
              <Card
                key={skill.title}
                title={skill.title}
                color={skill.color}
                items={skill.items}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

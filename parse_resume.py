import json
import re

def clean_text(text):
    text = re.sub(r'\(cid:\d+\)\s*', '', text)  # Remove (cid:xxx)
    text = text.replace('§', '|') # Replace § with |
    text = text.replace('#', '|') # Replace # with |
    return text

def extract_contact_info(text_lines):
    contact_info = {}
    # Assuming name is the first line
    contact_info['name'] = text_lines[0].strip()

    # Address is likely the second line
    contact_info['address'] = text_lines[1].strip()

    # Phone, Email, LinkedIn, GitHub are usually on the same line or consecutive lines
    contact_details_line = ""
    for line in text_lines[2:5]: # Check a few lines for contact details
        if "@" in line or "linkedin.com" in line or "github.com" in line or re.search(r'\+91', line):
            contact_details_line += line.strip() + " | "

    contact_details_line = contact_details_line.strip().rstrip('|').strip()

    phone_match = re.search(r'(\+91\s*\d{3}\s*\d{3}\s*\d{4})', contact_details_line)
    if phone_match:
        contact_info['phone'] = phone_match.group(1).strip()
        contact_details_line = contact_details_line.replace(phone_match.group(1), "").strip()

    email_match = re.search(r'([\w.-]+@[\w.-]+\.\w+)', contact_details_line)
    if email_match:
        contact_info['email'] = email_match.group(1).strip()
        contact_details_line = contact_details_line.replace(email_match.group(1), "").strip()

    linkedin_match = re.search(r'(linkedin\.com/in/[\w-]+)', contact_details_line) # Made more specific to /in/
    if linkedin_match:
        contact_info['linkedin'] = linkedin_match.group(1).strip()
        contact_details_line = contact_details_line.replace(linkedin_match.group(1), "").strip()

    github_match = re.search(r'(github\.com/[\w-]+)', contact_details_line) # This regex is likely fine
    if github_match:
        contact_info['github'] = github_match.group(1).strip()

    # Clean up remaining separators
    for key, value in contact_info.items():
        if isinstance(value, str):
            contact_info[key] = value.replace("|", "").strip()

    return contact_info

def parse_resume(text):
    cleaned_text = clean_text(text)
    lines = cleaned_text.split('\n')

    # Remove empty lines
    lines = [line for line in lines if line.strip()]

    resume_data = {}

    # Extract Contact Information
    resume_data['contact_information'] = extract_contact_info(lines)

    # Initialize sections
    resume_data['education'] = {}
    resume_data['projects'] = []
    resume_data['technical_skills'] = {}
    resume_data['extracurricular'] = [] # Changed to list for multiple entries

    # Section parsing logic
    current_section = None
    for i, line in enumerate(lines):
        if "Education" in line:
            current_section = "education"
            # Basic Education parsing (can be improved)
            resume_data['education']['university'] = lines[i+1].strip()
            resume_data['education']['degree'] = lines[i+2].strip()
            cgpa_line = [l for l in lines[i:i+5] if "CGPA" in l]
            if cgpa_line:
                 resume_data['education']['cgpa'] = cgpa_line[0].replace("CGPA:", "").strip()

            coursework_lines = []
            relevant_coursework_found = False
            for course_line_idx in range(i, len(lines)):
                if "Relevant Coursework" in lines[course_line_idx]:
                    relevant_coursework_found = True
                    continue
                if relevant_coursework_found:
                    if "Projects" in lines[course_line_idx] or "Technical Skills" in lines[course_line_idx]:
                        break
                    if lines[course_line_idx].strip().startswith("•"):
                        coursework_lines.append(lines[course_line_idx].replace("•","").strip())
            resume_data['education']['coursework'] = coursework_lines
            continue # Move to next line after processing education section

        elif "Projects" in line:
            current_section = "projects"
            continue
        elif "Technical Skills" in line:
            current_section = "technical_skills"
            continue
        elif "Extracurricular" in line:
            current_section = "extracurricular"
            continue

        if current_section == "projects":
            # Naive project parsing:
            # Assumes project title is followed by technologies, then duration, then description, then GitHub
            # This needs to be much more robust
            # Look for a line that might be a project title (e.g., contains '|')
            # and a date range (e.g., contains '–') on the next line OR the line itself (for projects on one line)
            is_project_title_line = False
            if i + 1 < len(lines):
                if re.search(r'\w+ \d{4} – \w+ \d{4}', lines[i+1]): # Check for date on next line
                    is_project_title_line = True
            # Also consider if the current line itself contains the project title and duration pattern
            # Example: "Title | Tech Stack Mar 2025 – Apr 2025 (Team of 4)"
            # For this, we need to be careful not to misinterpret other lines.
            # A simple check for '|' and '–' and a year pattern on the same line.
            if not is_project_title_line and '|' in line and '–' in line and re.search(r'\d{4}', line):
                # This might be a project where title, tech, and duration are on the same line or spread differently.
                # For now, we'll assume the original structure if date is on NEXT line for more reliability.
                # The current example "Recommender System – Microservices | FastAPI, Docker, MongoDB, Nginx Mar 2025 – Apr 2025 (Team of 4)"
                # has the date on the same line as the pipe, but it's part of the duration string.
                # The key is that the line *after* "Projects" heading starts a project.
                # Let's refine the project start detection.
                # A project entry starts with its title. The duration is usually on the next line, or part of the title line.
                # The title usually has a "|" separating title and tech stack.
                 pass # Let's adjust the primary if condition

            # Revised condition: A line could be a project title if it contains '|' (for title/tech)
            # and the *next* line contains a typical date range.
            # OR the current line contains title | tech AND a date range.

            # Heuristic: Project title often has a '|' separating title and tech.
            # Duration is usually on the line immediately following or as part of the line with the title.

            # Let's assume a project line has the title, and the next line has the duration.
            # The "Recommender System" project has title on one line, and duration on the next.
            # It seems the issue might be that the first project's description parsing consumes too many lines.

            # New approach for project start:
            # A line is a project title if it contains '|' (title | technologies)
            # AND the next line looks like a duration (e.g., "Month Year - Month Year (Team...)")
            # OR if the current line itself contains all these elements.

            # The current structure of projects in the text is:
            # Project Title | Technologies
            # Duration (Team of X)
            # – Description item 1
            # – Description item 2
            # GitHub: link (optional)

            # Revised project start condition:
            # A project line has a title, optionally technologies separated by '|'.
            # Duration can be on the same line or the next line.
            # It must contain '–' and a year (e.g., "2024").

            project_title_line = line
            duration_line_offset = 0
            description_start_offset = 1

            # Case 1: Duration is on the same line as the title
            # "Project Title | Tech Stack Month Year – Month Year (Team)"
            if '|' in project_title_line and '–' in project_title_line and re.search(r'\d{4}', project_title_line):
                duration_line_offset = 0
                description_start_offset = 1
            # Case 2: Duration is on the next line
            # "Project Title | Tech Stack"
            # "Month Year – Month Year (Team)"
            elif '|' in project_title_line and (i + 1 < len(lines) and '–' in lines[i+1] and re.search(r'\d{4}', lines[i+1])):
                duration_line_offset = 1
                description_start_offset = 2
            else:
                # Not a project starting line based on current heuristics
                if current_section == "projects": # only if we are already in projects section
                    # This 'else' means the line is not a new project's title.
                    # It could be a description line for the *previous* project if not handled by inner loop.
                    # This part of logic might need review if projects are missed or descriptions are wrong.
                    pass
                continue # Not a recognized project start

            project = {}
            # Extract title and technologies
            title_tech_part = project_title_line
            duration_text = ""

            if duration_line_offset == 0: # Duration on the same line
                # Try to split by date pattern to separate title/tech from duration
                match = re.search(r'(.*?)\s+(\w+ \d{4} – \w+ \d{4}.*)', project_title_line)
                if match:
                    title_tech_part = match.group(1).strip()
                    duration_text = match.group(2).strip()
                else: # Fallback if regex fails
                    duration_text = "Error extracting duration"
            else: # Duration on the next line
                duration_text = lines[i+duration_line_offset].strip()

            title_parts = title_tech_part.split('|')
            project['title'] = title_parts[0].strip()
            if len(title_parts) > 1:
                project['technologies'] = title_parts[1].strip()
            else:
                project['technologies'] = "" # No technologies listed after pipe

            project['duration'] = duration_text

            description_lines = []
            github_link = None

            # Consume lines for description
            for j in range(i + description_start_offset, len(lines)):
                current_project_line = lines[j]
                if "GitHub:" in current_project_line:
                    github_link = current_project_line.replace("GitHub:", "").strip()
                    # Potentially, description lines could continue after GitHub, but typically GitHub is last.
                    # Assuming GitHub is the end of this project's text.
                    break

                # Heuristic to detect start of a new project or new section
                is_next_project_line = False
                if '|' in current_project_line and '–' in current_project_line and re.search(r'\d{4}', current_project_line): # new project, case 1
                    is_next_project_line = True
                elif '|' in current_project_line and (j + 1 < len(lines) and '–' in lines[j+1] and re.search(r'\d{4}', lines[j+1])): # new project, case 2
                    is_next_project_line = True

                if is_next_project_line or \
                   "Technical Skills" in current_project_line or \
                   "Extracurricular" in current_project_line or \
                   "Education" in current_project_line:
                    break # Stop description parsing

                if current_project_line.strip().startswith("–"):
                    description_lines.append(current_project_line.strip())

            project['description'] = " ".join(description_lines)
            if github_link:
                project['github'] = github_link.replace("–", "").strip()
            resume_data['projects'].append(project)
            # Crucial: advance 'i' to skip lines already processed by this project parsing block
            # This was missing and likely caused issues with projects consuming each other's lines or missing projects.
            # However, the main loop 'for i, line in enumerate(lines):' handles 'i'.
            # We need to ensure that description parsing stops correctly and doesn't over-consume.
            # The 'break' statements in the inner loop are key.
            # No explicit 'i' advancement here, rely on outer loop and correct break conditions.

        elif current_section == "technical_skills":
            # This is a very basic approach for skills.
            # It assumes skills are listed after certain keywords.
            if line.startswith("Languages:"):
                resume_data['technical_skills']['languages'] = line.replace("Languages:", "").strip()
            elif line.startswith("Technologies/Frameworks:"):
                resume_data['technical_skills']['technologies_frameworks'] = line.replace("Technologies/Frameworks:", "").strip()
            elif line.startswith("Tools:"):
                resume_data['technical_skills']['tools'] = line.replace("Tools:", "").strip()

        elif current_section == "extracurricular":
            # New logic for Extracurricular:
            # An activity starts with the organization name.
            # The next line has Role and Duration.
            # Subsequent lines starting with '–' are descriptions.

            # Check if 'line' could be an organization name.
            # Heuristic: Not starting with '–' and the next line contains a month and year (duration regex).
            # And current line is not a section header itself
            if not line.strip().startswith("–") and \
               line.strip() != "Extracurricular" and \
               i + 1 < len(lines) and \
               re.search(r'\w+ \d{4} – \w+ \d{4}', lines[i+1]): # Check for date pattern on next line

                activity = {}
                activity['organization'] = line.strip()

                role_duration_line = lines[i+1].strip()
                # More robust regex for role and duration
                match = re.match(r'^(.*?)\s+(\w+\s+\d{4}\s*–\s*\w+\s+\d{4}(?:\s*\(.*\))?)$', role_duration_line)
                if not match: # Try another pattern if the first fails, e.g. if no text after duration
                     match = re.match(r'^(.*?)\s+(\w+\s+\d{4}\s*–\s*\w+\s+\d{4})$', role_duration_line)

                if match:
                    role_candidate = match.group(1).strip()
                    # Check if role_candidate itself is a date, meaning no actual role text was present
                    if re.fullmatch(r'\w+\s+\d{4}\s*–\s*\w+\s+\d{4}(?:\s*\(.*\))?', role_candidate):
                        activity['role'] = "" # Role is empty if only date was found by (.*?)
                        activity['duration'] = role_candidate
                    else:
                        activity['role'] = role_candidate
                        activity['duration'] = match.group(2).strip()
                else:
                    # Fallback if role is not present or regex fails for combined line
                    activity['role'] = ""
                    activity['duration'] = role_duration_line # Assign the whole line as duration

                description_lines = []
                # Start description parsing from the line after role/duration
                for j in range(i + 2, len(lines)):
                    desc_line_stripped = lines[j].strip()

                    # Stop if we hit a new section OR
                    # what looks like a new extracurricular activity (an org name followed by a duration line)
                    is_new_section_header = "Education" in lines[j] or \
                                     "Projects" in lines[j] or \
                                     "Technical Skills" in lines[j] # Check on original line for section headers

                    is_next_activity_start_heuristic = False
                    # Check if current stripped line could be an org name and next line a duration
                    if not desc_line_stripped.startswith("–") and \
                       desc_line_stripped and \
                       j + 1 < len(lines) and \
                       re.search(r'\w+ \d{4} – \w+ \d{4}', lines[j+1]):
                       is_next_activity_start_heuristic = True

                    if is_new_section_header or is_next_activity_start_heuristic:
                        break # Stop parsing for current activity

                    if desc_line_stripped.startswith("–"):
                        description_lines.append(desc_line_stripped)
                    elif not desc_line_stripped: # Empty line signifies end of current description block
                        break
                    # Else (line is not empty, does not start with '–', is not a new section/activity start):
                    # This line is considered noise (e.g. "PES University") and should be ignored. Loop continues.

                activity['description'] = " ".join(description_lines)
                if activity['organization']: # Only add if we have an organization
                    resume_data['extracurricular'].append(activity)
                # To prevent the next line (role/duration) from being evaluated as a new organization:
                # We should ideally skip i+1 in the outer loop.
                # However, the loop structure `for i, line in enumerate(lines)` makes direct `i` manipulation tricky.
                # The `continue` for section headers and the project parsing's internal `continue` help.
                # The conditions for starting an activity are key.
                # The current line `line` is `lines[i]`. `lines[i+1]` is role/duration.
                # The next iteration of the outer loop will have `line` as `lines[i+1]`.
                # The condition `not line.strip().startswith("–")` and `re.search(date)` on `lines[i+1]` (which becomes `lines[i+2]`)
                # should prevent `lines[i+1]` (the role/duration line) from being treated as an org.


    return resume_data

if __name__ == '__main__':
    with open('extracted_text.txt', 'r', encoding='utf-8') as f:
        raw_text = f.read()

    parsed_data = parse_resume(raw_text)

    with open('resume_data.json', 'w', encoding='utf-8') as f:
        json.dump(parsed_data, f, indent=4)

    print("Resume data parsed and saved to resume_data.json")

    # Print the content of resume_data.json to standard output
    with open('resume_data.json', 'r', encoding='utf-8') as f:
        print(f.read())

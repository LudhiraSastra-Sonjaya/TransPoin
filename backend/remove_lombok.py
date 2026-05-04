import os
import re

directories = [
    r"src\main\java\com\TransPoin\model",
    r"src\main\java\com\TransPoin\dto"
]

def capitalize(s):
    if not s: return s
    return s[0].upper() + s[1:]

for d in directories:
    if not os.path.exists(d):
        continue
    for filename in os.listdir(d):
        if not filename.endswith(".java"):
            continue
        filepath = os.path.join(d, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        if '@Data' not in content:
            continue

        # Remove Lombok imports and annotations
        content = re.sub(r'import lombok\..*?;\n', '', content)
        content = re.sub(r'@Data\n', '', content)
        content = re.sub(r'@NoArgsConstructor\n', '', content)
        content = re.sub(r'@AllArgsConstructor\n', '', content)
        
        # We need to find the class name and the fields
        class_match = re.search(r'public class (\w+)', content)
        if not class_match:
            continue
        class_name = class_match.group(1)
        
        # Find all fields. Basic heuristic: lines with private type name;
        # Handling annotations like @Id, @Column etc.
        lines = content.split('\n')
        fields = []
        for line in lines:
            line_stripped = line.strip()
            # Match private [type] [name]; OR private [type] [name] = [val];
            if line_stripped.startswith('private '):
                # Clean up assigning
                if '=' in line_stripped:
                    decl = line_stripped.split('=')[0].strip()
                else:
                    decl = line_stripped.rstrip(';')
                
                parts = decl.split()
                if len(parts) >= 3 and parts[0] == 'private':
                    field_type = parts[1]
                    field_name = parts[2].rstrip(';')
                    fields.append((field_type, field_name))

        methods_str = "\n\n    // Generated Constructors, Getters and Setters\n"
        
        # Default constructor
        methods_str += f"    public {class_name}() {{\n    }}\n\n"
        
        # All args constructor
        if len(fields) > 0:
            args = ", ".join([f"{t} {n}" for t, n in fields])
            assigns = "\n".join([f"        this.{n} = {n};" for t, n in fields])
            methods_str += f"    public {class_name}({args}) {{\n{assigns}\n    }}\n\n"
        
        # Getters and Setters
        for t, n in fields:
            cap_n = capitalize(n)
            methods_str += f"    public {t} get{cap_n}() {{\n        return {n};\n    }}\n\n"
            methods_str += f"    public void set{cap_n}({t} {n}) {{\n        this.{n} = {n};\n    }}\n\n"

        # Inject before the last brace
        last_brace_idx = content.rfind('}')
        if last_brace_idx != -1:
            new_content = content[:last_brace_idx] + methods_str + "}\n"
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Processed {filename}")

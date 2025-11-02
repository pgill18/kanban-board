# Kanban Board - Software Development Team

A modern, interactive Kanban board application designed for software development teams to manage their workflow efficiently.

## Features

### 📋 Five-Column Workflow
- **Backlog**: Initial repository for all tasks
- **To Do**: Tasks ready to be started
- **In Progress**: Active tasks (WIP limit: 3)
- **In Review**: Tasks under review
- **Done**: Completed tasks

### 🎯 Priority Management
Color-coded priority levels for easy task identification:
- 🔴 **High Priority**: Red border and badge
- 🟠 **Medium Priority**: Orange border and badge
- 🟢 **Low Priority**: Green border and badge

### ⚠️ WIP Limit Enforcement
The "In Progress" column has a Work-In-Progress (WIP) limit of 3 tasks. When exceeded:
- Column background changes to light red
- Red border appears around the column
- Visual indicator helps maintain focus and prevent bottlenecks

### 🎨 Interactive Features
- **Drag and Drop**: Move tasks between columns seamlessly
- **Task Counters**: Each column displays its task count
- **Due Dates**: Tasks can have due dates with calendar icons
- **Overdue Alerts**: Overdue tasks are highlighted in red
- **Local Storage**: Task positions are saved automatically

### 📱 Responsive Design
- Fully responsive layout that works on desktop, tablet, and mobile devices
- Horizontal scrolling on smaller screens
- Optimized for all screen sizes

## Initial Tasks

The board comes pre-populated with two tasks:

1. **Set up project repository** (High Priority)
   - Due Date: November 15, 2024
   - Located in: Backlog

2. **Define user authentication flow** (Medium Priority)
   - No due date
   - Located in: Backlog

## Getting Started

### Option 1: Open Directly in Browser
Simply open `index.html` in your web browser:
```bash
# Open with default browser (Mac)
open index.html

# Open with default browser (Linux)
xdg-open index.html

# Open with default browser (Windows)
start index.html
```

### Option 2: Run with Local Server
For a better experience, serve the files using a local web server:

**Using Python:**
```bash
python3 -m http.server 8080
# Then visit http://localhost:8080
```

**Using Node.js (with http-server):**
```bash
npx http-server -p 8080
# Then visit http://localhost:8080
```

**Using PHP:**
```bash
php -S localhost:8080
# Then visit http://localhost:8080
```

## Usage

### Moving Tasks
1. Click and hold on any task card
2. Drag it to the desired column
3. Release to drop the task
4. Task counts update automatically
5. Changes are saved to browser's local storage

### Managing WIP Limit
- Try to keep "In Progress" tasks at or below 3
- The column will visually alert you when the limit is exceeded
- This helps maintain focus and workflow efficiency

### Task Information
Each task card displays:
- **Title**: The task description
- **Priority Badge**: Color-coded priority level
- **Due Date**: When applicable, shown with a calendar icon
- **Color-coded Border**: Left border matches priority level

## File Structure

```
kanban-board/
├── index.html      # Main HTML structure
├── styles.css      # Styling and responsive design
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Technical Details

### Technologies Used
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with flexbox and gradients
- **Vanilla JavaScript**: No frameworks required
- **Local Storage API**: Persistent data storage

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

### Key Features Implementation
- **Drag and Drop API**: Native HTML5 drag and drop
- **Responsive Grid**: CSS Flexbox layout
- **Data Persistence**: Browser LocalStorage
- **Dynamic Updates**: Real-time task count and WIP checking

## Customization

### Changing WIP Limit
Edit the `WIP_LIMIT` constant in `script.js`:
```javascript
const WIP_LIMIT = 3; // Change this value
```

### Adding New Tasks
Tasks can be added by modifying the `initialTasks` array in `script.js` or by implementing an "Add Task" feature.

### Modifying Priority Colors
Update the color schemes in `styles.css`:
```css
.priority-badge.high { /* High priority colors */ }
.priority-badge.medium { /* Medium priority colors */ }
.priority-badge.low { /* Low priority colors */ }
```

## Screenshots

### Initial Board State
![Kanban Board Initial State](https://github.com/user-attachments/assets/dfacafa6-8533-4bb2-ae33-8c64a9696e63)

### WIP Limit Exceeded
![WIP Limit Exceeded](https://github.com/user-attachments/assets/592d4d1f-31e4-409d-9759-6079bdb9ff6e)

## Future Enhancements

Potential features to add:
- [ ] Add new task button and form
- [ ] Edit existing tasks
- [ ] Delete tasks
- [ ] Filter tasks by priority
- [ ] Search functionality
- [ ] Export/import board state
- [ ] Task assignment to team members
- [ ] Task description and comments
- [ ] Time tracking
- [ ] Multiple board support

## License

This project is open source and available for use in any project.

## Contributing

Feel free to fork this project and submit pull requests with improvements or bug fixes.
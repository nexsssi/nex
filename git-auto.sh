#!/bin/bash

# Colors for better visibility
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Function to check if we're in a git repository
check_git_repo() {
    if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
        echo -e "${RED}Error: Not a git repository${NC}"
        exit 1
    fi
}

# Function to check and create .gitignore
check_gitignore() {
    if [ ! -f .gitignore ]; then
        echo -e "${YELLOW}Creating .gitignore file...${NC}"
        echo "node_modules/" > .gitignore
        echo ".DS_Store" >> .gitignore
        echo "*.log" >> .gitignore
        echo "dist/" >> .gitignore
        echo "build/" >> .gitignore
    fi
}

# Function to check for large files (>100MB)
check_large_files() {
    echo -e "${GREEN}Checking for large files...${NC}"
    find . -type f -size +100M ! -path "./.git/*" | while read file; do
        echo -e "${YELLOW}Warning: $file is larger than 100MB and may cause issues with GitHub${NC}"
    done
}

# Function to get current branch
get_branch() {
    current_branch=$(git branch --show-current)
    echo -e "${GREEN}Current branch: $current_branch${NC}"
}

# Main execution
echo -e "${GREEN}🔍 Starting git automation...${NC}"

# Check if in git repository
check_git_repo

# Check and setup .gitignore
check_gitignore

# Check for large files
check_large_files

# Get current branch
get_branch

# Check for changes
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}No changes to commit${NC}"
    exit 0
fi

# Show changes to be committed
echo -e "${GREEN}Changes to be committed:${NC}"
git status -s

# Get commit message
echo -e "${GREEN}Enter commit message (press enter for default message):${NC}"
read commit_message

# If no message provided, use default
if [ -z "$commit_message" ]; then
    commit_message="Update: $(date '+%Y-%m-%d %H:%M:%S')"
fi

# Execute git commands
echo -e "${GREEN}Adding changes...${NC}"
git add .

echo -e "${GREEN}Committing changes...${NC}"
git commit -m "$commit_message"

echo -e "${GREEN}Pulling latest changes...${NC}"
git pull --rebase

# Ask for branch confirmation
echo -e "${GREEN}Push to current branch '$current_branch'? (Y/n)${NC}"
read confirm_push

if [ -z "$confirm_push" ] || [ "${confirm_push,,}" = "y" ]; then
    echo -e "${GREEN}Pushing changes...${NC}"
    git push origin $current_branch
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Success! Changes have been pushed to $current_branch${NC}"
    else
        echo -e "${RED}❌ Push failed. Please check the error message above${NC}"
    fi
else
    echo -e "${YELLOW}Push cancelled${NC}"
fi
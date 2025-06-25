# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Team data migration to Contentful CMS
- New `teamMemberCards` content type integration with fields: headshot, employeeName, employeeTitle, employeeDept, employeeEmail
- TypeScript types for team member data (`TeamMember`, `TeamSection`, `TeamMemberContentful`)
- New ContentfulService method `getTeamMembers()` to fetch team data from CMS
- Loading and error states for team page data fetching
- Proper department grouping and sorting for team sections
- Custom hierarchical sorting system for team member display order
- Square aspect-ratio images for team member cards with edge-to-edge display

### Changed
- Migrated team data from static `data/team-data.js` to Contentful CMS for easier management
- Converted `TeamPage.jsx`, `TeamSection.jsx`, and `TeamMemberCard.jsx` to TypeScript (.tsx)
- Updated team page to use async data fetching with React hooks (useState, useEffect)
- Enhanced team page with loading spinner and error handling
- Team member images now use Contentful asset URLs with fallback to local placeholders
- **Team member card layout redesigned**: Switched from horizontal to vertical layout with square images
- **Grid spacing optimized**: Reduced gaps between cards from 8 to 4 for better space utilization
- **Enhanced team member sorting**: 
  - Leadership department follows custom order: Justin Brock → Steven Martinez → Jeff Senter → Jackson Taylor → Will Chapman → Jeremiah Lozano
  - Other departments use hierarchical sorting: Directors → Team Leads → Managers → Supervisors → Coordinators → Regular positions
  - Within each priority level, names are sorted alphabetically

### Technical Details
- Team data is now fetched dynamically from Contentful on page load
- Department sections are automatically sorted in preferred order: Leadership, Sales, Administrative, Marketing
- Maintains backward compatibility with existing team image assets in `/public/team/`
- Added comprehensive error handling and logging for Contentful integration
- Intelligent title-based sorting detects leadership roles by keywords in job titles
- Square images use CSS `aspect-square` for consistent card dimensions
- Cards display with centered text and improved visual hierarchy

This migration enables non-technical staff to easily update team member information through the Contentful web interface without requiring code deployments. The new sorting system ensures proper organizational hierarchy display while maintaining clean, professional card layouts.

### Removed
- Removed Sera Hall from team roster (Licensed Sales Agent)

---

*Note: This changelog documents significant changes to the codebase, team roster, and functionality.* 
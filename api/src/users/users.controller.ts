import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Req } from "@nestjs/common"
import { UsersService } from "./users.service"
import { AuthenticatedGuard } from "../auth/guards/authenticated.guard"
import type { UpdateUserDto, AddSkillDto, AddExperienceDto, AddEducationDto, UserQueryDto } from "./dto/user.dto"

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(query: UserQueryDto) {
    return this.usersService.findAll(query)
  }

  // Specific routes MUST come before :id parameter route
  @UseGuards(AuthenticatedGuard)
  @Get("me")
  getMe(@Req() req: { user: { id: string } }) {
    return this.usersService.findById(req.user.id);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('dashboard')
  getDashboard(@Req() req: { user: { id: string } }) {
    return this.usersService.getDashboard(req.user.id);
  }

  @Get('username/:username')
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @UseGuards(AuthenticatedGuard)
  @Patch("profile")
  updateProfile(@Req() req: { user: { id: string } }, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto)
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('profile')
  deleteProfile(@Req() req: { user: { id: string } }) {
    return this.usersService.remove(req.user.id);
  }

  @Post(":id/skills")
  @UseGuards(AuthenticatedGuard)
  addSkill(@Param('id') id: string, @Body() addSkillDto: AddSkillDto, @Req() req: { user: { id: string } }) {
    if (id !== req.user.id) {
      throw new Error("You can only add skills to your own profile")
    }
    return this.usersService.addSkill(id, addSkillDto)
  }

  @Delete(":id/skills/:skillId")
  @UseGuards(AuthenticatedGuard)
  removeSkill(@Param('id') id: string, @Param('skillId') skillId: string, @Req() req: { user: { id: string } }) {
    if (id !== req.user.id) {
      throw new Error("You can only remove skills from your own profile")
    }
    return this.usersService.removeSkill(id, skillId)
  }

  @Post(":id/experience")
  @UseGuards(AuthenticatedGuard)
  addExperience(@Param('id') id: string, @Body() addExperienceDto: AddExperienceDto, @Req() req: { user: { id: string } }) {
    if (id !== req.user.id) {
      throw new Error("You can only add experience to your own profile")
    }
    return this.usersService.addExperience(id, addExperienceDto)
  }

  @Delete(":id/experience/:experienceId")
  @UseGuards(AuthenticatedGuard)
  removeExperience(@Param('id') id: string, @Param('experienceId') experienceId: string, @Req() req: { user: { id: string } }) {
    if (id !== req.user.id) {
      throw new Error("You can only remove experience from your own profile")
    }
    return this.usersService.removeExperience(id, experienceId)
  }

  @Post(":id/education")
  @UseGuards(AuthenticatedGuard)
  addEducation(@Param('id') id: string, @Body() addEducationDto: AddEducationDto, @Req() req: { user: { id: string } }) {
    if (id !== req.user.id) {
      throw new Error("You can only add education to your own profile")
    }
    return this.usersService.addEducation(id, addEducationDto)
  }

  @Delete(":id/education/:educationId")
  @UseGuards(AuthenticatedGuard)
  removeEducation(@Param('id') id: string, @Param('educationId') educationId: string, @Req() req: { user: { id: string } }) {
    if (id !== req.user.id) {
      throw new Error("You can only remove education from your own profile")
    }
    return this.usersService.removeEducation(id, educationId)
  }

  @Post(":id/follow")
  @UseGuards(AuthenticatedGuard)
  followUser(@Param('id') id: string, @Req() req: { user: { id: string } }) {
    return this.usersService.followUser(req.user.id, id)
  }

  @Delete(":id/follow")
  @UseGuards(AuthenticatedGuard)
  unfollowUser(@Param('id') id: string, @Req() req: { user: { id: string } }) {
    return this.usersService.unfollowUser(req.user.id, id)
  }

  @Get(':id/followers')
  getFollowers(@Param('id') id: string) {
    return this.usersService.getFollowers(id);
  }

  @Get(':id/following')
  getFollowing(@Param('id') id: string) {
    return this.usersService.getFollowing(id);
  }
}

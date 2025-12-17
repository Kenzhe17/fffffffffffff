// Local Storage Implementation (No Supabase Required)
// This file provides the same API as supabase.js but uses localStorage

const SupabaseLocal = {
  // Initialize local storage with default data
  init() {
    if (!localStorage.getItem("unisync_initialized")) {
      this.seedData()
      localStorage.setItem("unisync_initialized", "true")
    }
  },

  seedData() {
    // Seed rooms
    const rooms = []
    const blocks = ["D", "E", "F", "G", "H", "I"]
    blocks.forEach((block) => {
      for (let floor = 1; floor <= 3; floor++) {
        for (let room = 1; room <= 4; room++) {
          const roomNumber = `${floor}0${room}`
          rooms.push({
            id: `${block}${roomNumber}`,
            block: block,
            room_number: roomNumber,
            capacity: 30,
            created_at: new Date().toISOString(),
          })
        }
      }
    })
    localStorage.setItem("unisync_rooms", JSON.stringify(rooms))
    localStorage.setItem("unisync_schedules", JSON.stringify([]))
    localStorage.setItem("unisync_lostfound", JSON.stringify([]))
    localStorage.setItem("unisync_announcements", JSON.stringify([]))
    localStorage.setItem("unisync_users", JSON.stringify([]))
  },

  // Auth methods
  async signUp(email, password) {
    const users = JSON.parse(localStorage.getItem("unisync_users") || "[]")

    if (users.find((u) => u.email === email)) {
      return { error: { message: "User already exists" }, data: null }
    }

    const user = {
      id: "user_" + Date.now(),
      email: email,
      created_at: new Date().toISOString(),
      is_admin: email === "adminsync17@gmail.com" || email.endsWith("@sdu.edu.kz"),
    }

    users.push(user)
    localStorage.setItem("unisync_users", JSON.stringify(users))
    localStorage.setItem("unisync_current_user", JSON.stringify(user))

    return { data: { user }, error: null }
  },

  async signIn(email, password) {
    const users = JSON.parse(localStorage.getItem("unisync_users") || "[]")
    const user = users.find((u) => u.email === email)

    if (!user) {
      // Auto-register on first login
      const result = await this.signUp(email, password)
      return result
    }

    localStorage.setItem("unisync_current_user", JSON.stringify(user))
    return { data: { user }, error: null }
  },

  async getCurrentUser() {
    const userStr = localStorage.getItem("unisync_current_user")
    if (!userStr) return null
    return JSON.parse(userStr)
  },

  async signOut() {
    localStorage.removeItem("unisync_current_user")
    return { error: null }
  },

  // Room methods
  async getAllRooms() {
    const rooms = JSON.parse(localStorage.getItem("unisync_rooms") || "[]")
    return rooms
  },

  async getRoomSchedules(roomId, day) {
    const schedules = JSON.parse(localStorage.getItem("unisync_schedules") || "[]")
    return schedules.filter((s) => {
      if (roomId && s.room_id !== roomId) return false
      if (day && s.day_of_week !== day) return false
      return true
    })
  },

  async updateRoomSchedule(roomId, dayOfWeek, startTime, endTime, isAvailable) {
    const schedules = JSON.parse(localStorage.getItem("unisync_schedules") || "[]")

    const existingIndex = schedules.findIndex(
      (s) => s.room_id === roomId && s.day_of_week === dayOfWeek && s.start_time === startTime,
    )

    if (existingIndex >= 0) {
      schedules[existingIndex].is_available = isAvailable
      schedules[existingIndex].updated_at = new Date().toISOString()
    } else {
      schedules.push({
        id: "schedule_" + Date.now() + "_" + Math.random(),
        room_id: roomId,
        day_of_week: dayOfWeek,
        start_time: startTime,
        end_time: endTime,
        is_available: isAvailable,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
    }

    localStorage.setItem("unisync_schedules", JSON.stringify(schedules))
    return schedules[existingIndex >= 0 ? existingIndex : schedules.length - 1]
  },

  // Lost & Found methods
  async getLostFoundItems(filters = {}) {
    let items = JSON.parse(localStorage.getItem("unisync_lostfound") || "[]")

    if (filters.category && filters.category !== "all") {
      items = items.filter((i) => i.category === filters.category)
    }
    if (filters.type && filters.type !== "all") {
      items = items.filter((i) => i.type === filters.type)
    }
    if (filters.search) {
      const search = filters.search.toLowerCase()
      items = items.filter(
        (i) => i.title.toLowerCase().includes(search) || i.description.toLowerCase().includes(search),
      )
    }

    return items
  },

  async createLostFoundItem(itemData) {
    const items = JSON.parse(localStorage.getItem("unisync_lostfound") || "[]")
    const user = await this.getCurrentUser()

    const newItem = {
      id: "item_" + Date.now(),
      ...itemData,
      user_id: user?.id || "anonymous",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    items.push(newItem)
    localStorage.setItem("unisync_lostfound", JSON.stringify(items))
    return newItem
  },

  async deleteLostFoundItem(itemId) {
    const items = JSON.parse(localStorage.getItem("unisync_lostfound") || "[]")
    const filtered = items.filter((i) => i.id !== itemId)
    localStorage.setItem("unisync_lostfound", JSON.stringify(filtered))
    return true
  },

  async updateLostFoundItem(itemId, updates) {
    const items = JSON.parse(localStorage.getItem("unisync_lostfound") || "[]")
    const index = items.findIndex((i) => i.id === itemId)

    if (index >= 0) {
      items[index] = { ...items[index], ...updates, updated_at: new Date().toISOString() }
      localStorage.setItem("unisync_lostfound", JSON.stringify(items))
      return items[index]
    }
    return null
  },

  // Announcements methods
  async getAnnouncements() {
    const announcements = JSON.parse(localStorage.getItem("unisync_announcements") || "[]")
    return announcements.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  },

  async createAnnouncement(title, content) {
    const announcements = JSON.parse(localStorage.getItem("unisync_announcements") || "[]")
    const user = await this.getCurrentUser()

    const newAnnouncement = {
      id: "announcement_" + Date.now(),
      title,
      content,
      author_id: user?.id || "admin",
      author_email: user?.email || "admin@sdu.edu.kz",
      created_at: new Date().toISOString(),
    }

    announcements.push(newAnnouncement)
    localStorage.setItem("unisync_announcements", JSON.stringify(announcements))
    return newAnnouncement
  },

  async deleteAnnouncement(announcementId) {
    const announcements = JSON.parse(localStorage.getItem("unisync_announcements") || "[]")
    const filtered = announcements.filter((a) => a.id !== announcementId)
    localStorage.setItem("unisync_announcements", JSON.stringify(filtered))
    return true
  },
}

// Initialize on load
SupabaseLocal.init()

// Export for use in HTML files
window.SupabaseLocal = SupabaseLocal
